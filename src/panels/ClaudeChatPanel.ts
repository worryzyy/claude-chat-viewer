import * as vscode from 'vscode';
import * as fs from 'fs';
import { getClaudeConfigPath } from '../utils/config';
import { getWebviewContent } from '../templates/webview';

export class ClaudeChatPanel {
    public static currentPanel: ClaudeChatPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    private _navigationStack: Array<{type: 'main' | 'project' | 'chat', data?: any}> = [];

    public static createOrShow(extensionUri: vscode.Uri, chatData?: any, projectPath?: string) {
        const column = vscode.window.activeTextEditor?.viewColumn;
        
        console.log('ClaudeChatPanel.createOrShow 调用', {
            hasCurrentPanel: !!ClaudeChatPanel.currentPanel,
            chatData: !!chatData,
            projectPath
        });
        
        if (ClaudeChatPanel.currentPanel) {
            console.log('ClaudeChatPanel: 面板已存在，重新初始化导航栈');
            ClaudeChatPanel.currentPanel._panel.reveal(column);
            
            // 重新初始化导航栈，确保正确的返回逻辑
            ClaudeChatPanel.currentPanel._initializePanel(chatData, projectPath);
            return;
        }

        console.log('ClaudeChatPanel: 创建新面板');
        const panel = vscode.window.createWebviewPanel(
            'claudeChat',
            'Claude 聊天记录查看器',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'webview')]
            }
        );

        ClaudeChatPanel.currentPanel = new ClaudeChatPanel(panel, extensionUri, chatData, projectPath);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, chatData?: any, projectPath?: string) {
        this._panel = panel;
        this._panel.webview.html = getWebviewContent(extensionUri);
        
        // 监听面板关闭事件
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        
        // 监听来自 webview 的消息
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'getChatData':
                        this._sendAllChatData();
                        break;
                    case 'exportData':
                        this._exportData();
                        break;
                    case 'navigateBack':
                        this._handleNavigateBack();
                        break;
                    case 'navigateToProject':
                        this._navigateToProject(message.projectPath);
                        break;
                    case 'navigateToChat':
                        this._navigateToChat(message.chatData, message.projectPath);
                        break;
                }
            },
            null,
            this._disposables
        );

        // 初始化导航栈并设置初始状态
        this._initializePanel(chatData, projectPath);
    }

    private _initializePanel(chatData?: any, projectPath?: string) {
        // 清空导航栈并设置初始状态
        this._navigationStack = [];
        
        console.log('ClaudeChatPanel: 初始化面板', { chatData: !!chatData, projectPath });
        
        if (projectPath && !chatData) {
            // 只有项目路径：显示项目聊天列表
            // 导航栈：主界面 -> 项目页面
            console.log('ClaudeChatPanel: 初始化 - 显示项目聊天列表', projectPath);
            this._navigationStack.push({type: 'main'});
            this._navigationStack.push({type: 'project', data: projectPath});
            setTimeout(() => this._sendProjectData(projectPath), 100);
        } else if (chatData && projectPath) {
            // 有聊天数据和项目路径：显示单个聊天记录
            // 导航栈：主界面 -> 项目页面 -> 聊天页面
            console.log('ClaudeChatPanel: 初始化 - 显示单个聊天记录', projectPath);
            this._navigationStack.push({type: 'main'});
            this._navigationStack.push({type: 'project', data: projectPath});
            this._navigationStack.push({type: 'chat', data: {chatData, projectPath}});
            setTimeout(() => this._sendChatData(chatData, projectPath), 100);
        } else {
            // 默认显示主界面
            console.log('ClaudeChatPanel: 初始化 - 显示主界面');
            this._navigationStack.push({type: 'main'});
            setTimeout(() => this._sendAllChatData(), 100);
        }
    }

    private _sendChatData(chatData: any, projectPath?: string) {
        // 添加数据验证，确保有效的聊天数据
        if (!chatData || typeof chatData.display !== 'string') {
            console.error('无效的聊天数据:', chatData);
            vscode.window.showErrorMessage('无法显示聊天记录：数据格式无效');
            return;
        }
        
        // 获取项目数据以便在单个聊天视图中显示项目详情
        let projectData = null;
        if (projectPath) {
            const claudeData = this._readClaudeData();
            if (claudeData?.projects[projectPath]) {
                projectData = claudeData.projects[projectPath];
            }
        }
        
        this._panel.webview.postMessage({
            command: 'showChat',
            data: chatData,
            projectPath: projectPath,
            projectData: projectData
        });
    }

    private _sendProjectData(projectPath: string) {
        console.log('ClaudeChatPanel: _sendProjectData', projectPath);
        const claudeData = this._readClaudeData();
        if (!claudeData?.projects[projectPath]) {
            console.error('无法找到项目数据:', projectPath);
            vscode.window.showErrorMessage('无法找到项目数据');
            return;
        }

        console.log('ClaudeChatPanel: 发送 showProject 消息');
        this._panel.webview.postMessage({
            command: 'showProject',
            data: {
                projectPath: projectPath,
                projectData: claudeData.projects[projectPath]
            }
        });
    }

    private _handleNavigateBack() {
        if (this._navigationStack.length <= 1) {
            // 已经在主界面，无法返回
            return;
        }

        // 移除当前页面
        this._navigationStack.pop();
        
        // 获取上一个页面
        const previousPage = this._navigationStack[this._navigationStack.length - 1];
        
        switch (previousPage.type) {
            case 'main':
                this._sendAllChatData();
                break;
            case 'project':
                this._sendProjectData(previousPage.data);
                break;
            case 'chat':
                this._sendChatData(previousPage.data.chatData, previousPage.data.projectPath);
                break;
        }
    }

    private _navigateToProject(projectPath: string) {
        console.log('ClaudeChatPanel: _navigateToProject', projectPath);
        this._navigationStack.push({type: 'project', data: projectPath});
        this._sendProjectData(projectPath);
    }

    private _navigateToChat(chatData: any, projectPath: string) {
        this._navigationStack.push({type: 'chat', data: {chatData, projectPath}});
        this._sendChatData(chatData, projectPath);
    }

    private _sendAllChatData() {
        const claudeData = this._readClaudeData();
        this._panel.webview.postMessage({
            command: 'allChatData',
            data: claudeData
        });
    }

    private _readClaudeData(): any {
        try {
            const claudeConfigPath = getClaudeConfigPath();
            if (!fs.existsSync(claudeConfigPath)) {
                return null;
            }
            const data = fs.readFileSync(claudeConfigPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('读取 claude.json 失败:', error);
            return null;
        }
    }

    private _exportData() {
        vscode.commands.executeCommand('claudeChat.exportData');
    }

    public sendBackToMain() {
        this._panel.webview.postMessage({
            command: 'backToMain'
        });
    }


    public dispose() {
        ClaudeChatPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}