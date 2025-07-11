import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getClaudeConfigPath } from '../utils/config';

export class ChatItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly projectPath: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public chatData?: any,
        public chatIndex?: number
    ) {
        super(label, collapsibleState);
        this.contextValue = 'chat';
    }
}

export class ProjectItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly projectPath: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly projectData?: any
    ) {
        super(label, collapsibleState);
        this.contextValue = 'project';
    }
}

export class ClaudeChatProvider implements vscode.TreeDataProvider<ChatItem | ProjectItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ChatItem | ProjectItem | undefined | null | void> = new vscode.EventEmitter<ChatItem | ProjectItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<ChatItem | ProjectItem | undefined | null | void> = this._onDidChangeTreeData.event;
    private treeView?: vscode.TreeView<ChatItem | ProjectItem>;

    constructor(private context: vscode.ExtensionContext) {}

    setTreeView(treeView: vscode.TreeView<ChatItem | ProjectItem>) {
        this.treeView = treeView;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ChatItem | ProjectItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ChatItem | ProjectItem): Thenable<(ChatItem | ProjectItem)[]> {
        if (!element) {
            return Promise.resolve(this.getProjects());
        }
        return Promise.resolve(this.getProjectChats(element));
    }

    private getProjects(): ProjectItem[] {
        const claudeData = this.readClaudeData();
        if (!claudeData?.projects) {
            return [new ProjectItem('无法读取 Claude 配置文件', '', vscode.TreeItemCollapsibleState.None)];
        }
        
        return Object.entries(claudeData.projects).map(([projectPath, projectData]: [string, any]) => {
            const projectName = path.basename(projectPath);
            const chatCount = projectData.history?.length || 0;
            
            const item = new ProjectItem(
                `${projectName} (${chatCount} 条对话)`,
                projectPath,
                vscode.TreeItemCollapsibleState.Collapsed,
                projectData
            );
            item.tooltip = `项目路径: ${projectPath}\n对话数量: ${chatCount}`;
            return item;
        });
    }

    private getProjectChats(element: ChatItem | ProjectItem): ChatItem[] {
        const claudeData = this.readClaudeData();
        if (!claudeData?.projects[element.projectPath]) {
            return [];
        }

        const project = claudeData.projects[element.projectPath];
        const history = project.history || [];
        
        return history.map((chat: any, index: number): ChatItem | null => {
            // 验证聊天数据的有效性
            if (!chat || typeof chat.display !== 'string') {
                console.warn(`跳过无效的聊天记录 (索引 ${index}):`, chat);
                return null;
            }
            
            const preview = this.getChatPreview(chat.display);
            const item = new ChatItem(
                `${index + 1}. ${preview}`,
                element.projectPath,
                vscode.TreeItemCollapsibleState.None,
                chat,
                index
            );
            item.tooltip = `#${index + 1}: ${chat.display}`;
            return item;
        }).filter((item: ChatItem | null): item is ChatItem => item !== null); // 过滤掉无效的项目
    }

    private getChatPreview(display: string): string {
        const maxLength = 50;
        if (display.length <= maxLength) {
            return display;
        }
        return display.substring(0, maxLength) + '...';
    }

    public readClaudeData(): any {
        try {
            const claudeConfigPath = getClaudeConfigPath();
            if (!fs.existsSync(claudeConfigPath)) {
                return null;
            }
            const data = fs.readFileSync(claudeConfigPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('读取 claude.json 失败:', error);
            vscode.window.showErrorMessage(`读取 Claude 配置文件失败: ${error}`);
            return null;
        }
    }

    async exportData(): Promise<void> {
        const claudeData = this.readClaudeData();
        if (!claudeData) {
            vscode.window.showErrorMessage('无法读取 Claude 数据');
            return;
        }

        const uri = await vscode.window.showSaveDialog({
            filters: {
                'JSON': ['json'],
                'All Files': ['*']
            },
            defaultUri: vscode.Uri.file('claude-chat-export.json')
        });

        if (uri) {
            try {
                fs.writeFileSync(uri.fsPath, JSON.stringify(claudeData, null, 2));
                vscode.window.showInformationMessage(`聊天记录已导出到: ${uri.fsPath}`);
            } catch (error) {
                vscode.window.showErrorMessage(`导出失败: ${error}`);
            }
        }
    }
}