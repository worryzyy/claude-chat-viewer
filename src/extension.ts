import * as vscode from 'vscode';
import * as fs from 'fs';
import { ClaudeChatProvider, ProjectItem, ChatItem } from './providers/ChatProvider';
import { ClaudeChatPanel } from './panels/ClaudeChatPanel';
import { getClaudeConfigPath } from './utils/config';

export function activate(context: vscode.ExtensionContext) {
    console.log('Claude Chat Viewer 扩展已激活');

    // 创建数据提供者
    const provider = new ClaudeChatProvider(context);
    
    // 注册 Tree View
    const treeView = vscode.window.createTreeView('claudeChat', {
        treeDataProvider: provider,
        showCollapseAll: true
    });

    // 设置 TreeView 到 provider
    provider.setTreeView(treeView);

    // 注册命令
    const openViewerCommand = vscode.commands.registerCommand('claudeChat.openViewer', () => {
        // 默认打开项目详情页面，优先显示当前工作目录的项目
        const claudeData = provider.readClaudeData();
        
        if (claudeData?.projects) {
            const projectPaths = Object.keys(claudeData.projects);
            if (projectPaths.length > 0) {
                // 优先寻找当前工作目录的项目
                const currentWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
                let targetProject = projectPaths[0]; // 默认第一个项目
                
                if (currentWorkspace) {
                    const matchingProject = projectPaths.find(path => path === currentWorkspace);
                    if (matchingProject) {
                        targetProject = matchingProject;
                    }
                }
                
                // 打开目标项目的详情页面
                ClaudeChatPanel.createOrShow(context.extensionUri, undefined, targetProject);
                return;
            }
        }
        
        // 如果没有项目数据，则显示主界面
        ClaudeChatPanel.createOrShow(context.extensionUri);
    });

    const refreshCommand = vscode.commands.registerCommand('claudeChat.refresh', () => {
        provider.refresh();
    });

    const exportCommand = vscode.commands.registerCommand('claudeChat.exportData', () => {
        provider.exportData();
    });

    const backToMainCommand = vscode.commands.registerCommand('claudeChat.backToMain', () => {
        // 发送消息到 webview 要求返回主界面
        if (ClaudeChatPanel.currentPanel) {
            ClaudeChatPanel.currentPanel.sendBackToMain();
        }
    });

    // 监听树视图选择事件
    treeView.onDidChangeSelection((e: any) => {
        console.log('Extension: 树视图选择事件触发', e.selection);
        if (e.selection.length > 0) {
            const item = e.selection[0];
            console.log('Extension: 选择的项目', {
                label: item.label,
                contextValue: item.contextValue,
                projectPath: item.projectPath,
                chatIndex: item.chatIndex
            });
            
            if (item.contextValue === 'chat' && item.projectPath) {
                console.log('Extension: 左侧点击聊天记录，直接显示单个聊天内容');
                // 点击单个聊天记录，直接显示单个聊天内容
                ClaudeChatPanel.createOrShow(context.extensionUri, item.chatData, item.projectPath);
            }
        }
    });

    // 添加点击事件监听，作为备用方案
    const clickCommand = vscode.commands.registerCommand('claudeChat.itemClicked', (item: any) => {
        if (item && item.contextValue === 'chat' && item.projectPath) {
            ClaudeChatPanel.createOrShow(context.extensionUri, undefined, item.projectPath);
        }
    });

    // 添加到订阅列表
    context.subscriptions.push(
        treeView,
        openViewerCommand,
        refreshCommand,
        exportCommand,
        backToMainCommand,
        clickCommand
    );

    // 自动刷新
    const config = vscode.workspace.getConfiguration('claudeChat');
    if (config.get('autoRefresh')) {
        const claudeConfigPath = getClaudeConfigPath();
        if (fs.existsSync(claudeConfigPath)) {
            fs.watchFile(claudeConfigPath, () => {
                provider.refresh();
            });
        }
    }
}

export function deactivate() {}