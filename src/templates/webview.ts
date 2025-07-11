export function getWebviewContent(extensionUri: any, language: string = 'en'): string {
    // 获取国际化消息
    const messages: {[key: string]: any} = {
        'zh-cn': {
            title: 'Claude 聊天记录查看器',
            loading: '正在加载聊天记录...',
            noData: '没有找到聊天记录数据',
            search: '搜索聊天记录...',
            export: '导出数据',
            back: '返回',
            totalProjects: '项目总数',
            totalChats: '对话总数',
            totalCost: '总花费',
            chatCount: '条对话',
            cost: '花费',
            projectDetails: '项目详情',
            chatDetails: '对话详情',
            chatContent: '对话内容',
            pastedContent: '粘贴内容',
            recentChats: '最近对话',
            projectStats: '📊 项目统计',
            chatNumber: '聊天数量',
            apiDuration: 'API持续时间',
            totalDuration: '总持续时间',
            inputTokens: '输入Token',
            outputTokens: '输出Token',
            cacheStats: '🗄️ 缓存统计',
            cacheCreationTokens: '缓存创建Token',
            cacheReadTokens: '缓存读取Token',
            linesAdded: '代码行添加',
            linesRemoved: '代码行删除',
            projectConfig: '⚙️ 项目配置',
            trustDialog: '信任对话框',
            projectOnboarding: '项目引导完成',
            onboardingCount: '引导显示次数',
            claudeMdIncludes: 'Claude MD外部包含',
            mdWarningShown: 'MD警告显示',
            webSearchRequests: '网络搜索请求',
            mcpServers: '🔌 MCP 服务器',
            allowedTools: '允许的工具',
            enabledMcpServers: '启用的MCP服务器',
            disabledMcpServers: '禁用的MCP服务器',
            mcpServerDetails: 'MCP服务器详情',
            sessionInfo_title: '🔗 会话信息',
            lastSessionId: '最后会话ID',
            mcpContextUris: 'MCP上下文URI',
            trusted: '🔒 已信任',
            untrusted: '🔓 未信任',
            completed: '✅ 已完成',
            notCompleted: '❌ 未完成',
            yes: '✅ 是',
            no: '❌ 否',
            none: '无',
            errorLoadingChat: '无法加载聊天记录数据',
            noMatchingRecords: '没有找到匹配的聊天记录',
            noChatsInProject: '该项目暂无聊天记录',
            showHideDetails: '📊 显示/隐藏项目详细信息',
            attachments: '包含附件内容',
            sessionInfo: '会话'
        },
        'en': {
            title: 'Claude Chat Records Viewer',
            loading: 'Loading chat records...',
            noData: 'No chat record data found',
            search: 'Search chat records...',
            export: 'Export Data',
            back: 'Back',
            totalProjects: 'Total Projects',
            totalChats: 'Total Chats',
            totalCost: 'Total Cost',
            chatCount: ' conversations',
            cost: 'Cost',
            projectDetails: 'Project Details',
            chatDetails: 'Chat Details',
            chatContent: 'Chat Content',
            pastedContent: 'Pasted Content',
            recentChats: 'Recent Chats',
            projectStats: '📊 Project Statistics',
            chatNumber: 'Chat Count',
            apiDuration: 'API Duration',
            totalDuration: 'Total Duration',
            inputTokens: 'Input Tokens',
            outputTokens: 'Output Tokens',
            cacheStats: '🗄️ Cache Statistics',
            cacheCreationTokens: 'Cache Creation Tokens',
            cacheReadTokens: 'Cache Read Tokens',
            linesAdded: 'Lines Added',
            linesRemoved: 'Lines Removed',
            projectConfig: '⚙️ Project Configuration',
            trustDialog: 'Trust Dialog',
            projectOnboarding: 'Project Onboarding',
            onboardingCount: 'Onboarding Count',
            claudeMdIncludes: 'Claude MD External Includes',
            mdWarningShown: 'MD Warning Shown',
            webSearchRequests: 'Web Search Requests',
            mcpServers: '🔌 MCP Servers',
            allowedTools: 'Allowed Tools',
            enabledMcpServers: 'Enabled MCP Servers',
            disabledMcpServers: 'Disabled MCP Servers',
            mcpServerDetails: 'MCP Server Details',
            sessionInfo_title: '🔗 Session Information',
            lastSessionId: 'Last Session ID',
            mcpContextUris: 'MCP Context URIs',
            trusted: '🔒 Trusted',
            untrusted: '🔓 Untrusted',
            completed: '✅ Completed',
            notCompleted: '❌ Not Completed',
            yes: '✅ Yes',
            no: '❌ No',
            none: 'None',
            errorLoadingChat: 'Unable to load chat record data',
            noMatchingRecords: 'No matching chat records found',
            noChatsInProject: 'No chat records in this project',
            showHideDetails: '📊 Show/Hide Project Details',
            attachments: 'Contains attachments',
            sessionInfo: 'Session'
        }
    };

    const t = messages[language] || messages['en'];
    return `<!DOCTYPE html>
<html lang="${language === 'zh-cn' ? 'zh-CN' : 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        .search-box {
            padding: 8px 12px;
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            width: 300px;
        }
        .export-btn {
            padding: 8px 16px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .export-btn:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .back-btn {
            padding: 6px 12px;
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            border: 1px solid var(--vscode-button-border);
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .back-btn:hover {
            background-color: var(--vscode-button-secondaryHoverBackground);
        }
        .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        .stat-item {
            background-color: var(--vscode-panel-background);
            padding: 15px;
            border-radius: 6px;
            border: 1px solid var(--vscode-panel-border);
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: var(--vscode-textLink-foreground);
        }
        .stat-label {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            margin-top: 5px;
        }
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
        }
        .project-card {
            background-color: var(--vscode-panel-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .project-card:hover {
            border-color: var(--vscode-textLink-foreground);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .project-stats-mini {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
            margin: 10px 0;
            font-size: 11px;
        }
        .stat-mini {
            color: var(--vscode-descriptionForeground);
            padding: 2px 6px;
            background-color: var(--vscode-editor-background);
            border-radius: 3px;
        }
        .project-indicators {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            margin: 8px 0;
        }
        .indicator {
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: 500;
        }
        .indicator.trusted {
            background-color: var(--vscode-testing-iconPassed);
            color: white;
        }
        .indicator.untrusted {
            background-color: var(--vscode-testing-iconFailed);
            color: white;
        }
        .indicator.onboarded {
            background-color: var(--vscode-terminal-ansiGreen);
            color: white;
        }
        .indicator.not-onboarded {
            background-color: var(--vscode-terminal-ansiYellow);
            color: black;
        }
        .indicator.mcp {
            background-color: var(--vscode-terminal-ansiBlue);
            color: white;
        }
        .session-info {
            font-size: 10px;
            color: var(--vscode-descriptionForeground);
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--vscode-panel-border);
        }
        .project-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--vscode-textLink-foreground);
        }
        .project-path {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            margin-bottom: 15px;
            word-break: break-all;
        }
        .chat-preview {
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            padding: 12px;
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 1.4;
        }
        .chat-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
        }
        .chat-count {
            background-color: var(--vscode-badge-background);
            color: var(--vscode-badge-foreground);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
        }
        .no-data {
            text-align: center;
            color: var(--vscode-descriptionForeground);
            font-style: italic;
            padding: 40px;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: var(--vscode-descriptionForeground);
        }
        .single-chat {
            background-color: var(--vscode-panel-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .chat-display {
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            padding: 15px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            word-wrap: break-word;
            line-height: 1.5;
        }
        .project-chat-view {
            max-width: 800px;
            margin: 0 auto;
        }
        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid var(--vscode-panel-border);
        }
        .project-header h2 {
            margin: 0;
            color: var(--vscode-textLink-foreground);
            font-size: 24px;
            font-weight: 600;
        }
        .project-stats {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }
        .stat-badge {
            background-color: var(--vscode-badge-background);
            color: var(--vscode-badge-foreground);
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
        }
        .project-metadata {
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
        }
        .metadata-section {
            margin-bottom: 16px;
        }
        .metadata-title {
            font-weight: 600;
            color: var(--vscode-textLink-foreground);
            margin-bottom: 8px;
            font-size: 14px;
        }
        .metadata-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
        }
        .metadata-item {
            display: flex;
            justify-content: space-between;
            padding: 4px 8px;
            background-color: var(--vscode-panel-background);
            border-radius: 4px;
            font-size: 12px;
        }
        .metadata-label {
            color: var(--vscode-descriptionForeground);
            font-weight: 500;
        }
        .metadata-value {
            color: var(--vscode-editor-foreground);
            word-break: break-all;
        }
        .metadata-value.boolean {
            color: var(--vscode-textLink-foreground);
        }
        .metadata-value.number {
            color: var(--vscode-terminal-ansiGreen);
        }
        .mcp-servers {
            max-height: 100px;
            overflow-y: auto;
            background-color: var(--vscode-panel-background);
            border-radius: 4px;
            padding: 8px;
        }
        .toggle-metadata {
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            border: 1px solid var(--vscode-button-border);
            border-radius: 4px;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 12px;
            margin-bottom: 12px;
        }
        .toggle-metadata:hover {
            background-color: var(--vscode-button-secondaryHoverBackground);
        }
        .chat-list-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .chat-message {
            background-color: var(--vscode-panel-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 12px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }
        .chat-message:hover {
            border-color: var(--vscode-textLink-foreground);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transform: translateY(-1px);
        }
        .chat-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        .chat-avatar {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, var(--vscode-textLink-foreground), var(--vscode-button-background));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
        }
        .chat-meta-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .chat-index {
            font-weight: 600;
            color: var(--vscode-textLink-foreground);
            font-size: 14px;
        }
        .chat-timestamp {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
        }
        .chat-actions {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .expand-icon {
            color: var(--vscode-textLink-foreground);
            font-size: 14px;
            font-weight: bold;
            transition: transform 0.2s ease;
        }
        .chat-content {
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-input-border);
            border-radius: 8px;
            padding: 14px;
            line-height: 1.6;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .chat-preview, .chat-full {
            color: var(--vscode-editor-foreground);
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .chat-full {
            border-top: 1px solid var(--vscode-panel-border);
            margin-top: 12px;
            padding-top: 12px;
        }
        .chat-attachments {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            padding: 8px 12px;
            background-color: var(--vscode-textBlockQuote-background);
            border-left: 3px solid var(--vscode-textLink-foreground);
            border-radius: 4px;
            font-size: 13px;
            color: var(--vscode-textLink-foreground);
        }
        .attachment-icon {
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="display: flex; align-items: center; gap: 10px;">
                <button class="back-btn" id="backBtn" onclick="backToMain()" style="display: none;">
                    ← ${t.back}
                </button>
                <h1 id="pageTitle">${t.title}</h1>
            </div>
            <div>
                <input type="text" class="search-box" placeholder="${t.search}" id="searchInput">
                <button class="export-btn" onclick="exportData()">${t.export}</button>
            </div>
        </div>

        <div id="stats" class="stats" style="display: none;">
            <div class="stat-item">
                <div class="stat-number" id="totalProjects">0</div>
                <div class="stat-label">${t.totalProjects}</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="totalChats">0</div>
                <div class="stat-label">${t.totalChats}</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="totalCost">$0</div>
                <div class="stat-label">${t.totalCost}</div>
            </div>
        </div>

        <div id="content" class="loading">
            ${t.loading}
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let allData = null;
        let currentProjectData = null;
        let currentProjectPath = null;
        let currentFilter = '';
        let currentLanguage = '${language}';
        
        // 国际化消息
        const i18nMessages = ${JSON.stringify(messages)};
        const t = i18nMessages[currentLanguage] || i18nMessages['en'];

        // 页面加载时请求数据
        window.addEventListener('load', () => {
            // 延迟一下确保 webview 完全加载
            setTimeout(() => {
                vscode.postMessage({ command: 'getChatData' });
            }, 100);
        });

        // 监听来自扩展的消息
        window.addEventListener('message', event => {
            const message = event.data;
            console.log('Webview: 收到消息', message.command, message);
            
            // 更新语言设置
            if (message.language) {
                currentLanguage = message.language;
                const newT = i18nMessages[currentLanguage] || i18nMessages['en'];
                Object.assign(t, newT);
            }
            
            switch (message.command) {
                case 'allChatData':
                    allData = message.data;
                    renderAllProjects();
                    break;
                case 'showChat':
                    renderSingleChat(message.data, message.projectPath, message.projectData);
                    break;
                case 'showProject':
                    console.log('Webview: 处理 showProject', message.data);
                    renderProjectChats(message.data.projectPath, message.data.projectData);
                    break;
                case 'backToMain':
                    backToMain();
                    break;
            }
        });

        function renderAllProjects() {
            if (!allData || !allData.projects) {
                document.getElementById('content').innerHTML = '<div class="no-data">' + t.noData + '</div>';
                return;
            }

            // 隐藏返回按钮，显示主界面标题
            document.getElementById('backBtn').style.display = 'none';
            document.getElementById('pageTitle').textContent = t.title;

            const projects = Object.entries(allData.projects);
            let totalChats = 0;
            let totalCost = 0;

            const projectsHtml = projects.map(([path, data]) => {
                const chatCount = data.history?.length || 0;
                const cost = data.lastCost || 0;
                totalChats += chatCount;
                totalCost += cost;

                const projectName = path.split('/').pop() || path;
                const recentChats = (data.history || []).slice(-3);
                
                const chatsHtml = recentChats.map(chat => {
                    const preview = chat.display.length > 100 ? 
                        chat.display.substring(0, 100) + '...' : 
                        chat.display;
                    return '<div class="chat-preview">' + preview + '</div>';
                }).join('');

                return '<div class="project-card" onclick="openProject(\\'' + path + '\\')"><div class="project-name">' + projectName + '</div><div class="project-path">' + path + '</div><div class="chat-meta"><span class="chat-count">' + chatCount + ' ' + t.chatCount + '</span><span>' + t.cost + ': $' + cost.toFixed(4) + '</span></div><div class="project-stats-mini"><div class="stat-mini">📥 ' + t.inputTokens + ': ' + (data.lastTotalInputTokens || 0).toLocaleString() + '</div><div class="stat-mini">📤 ' + t.outputTokens + ': ' + (data.lastTotalOutputTokens || 0).toLocaleString() + '</div><div class="stat-mini">➕ ' + t.linesAdded + ': ' + (data.lastLinesAdded || 0) + '</div><div class="stat-mini">➖ ' + t.linesRemoved + ': ' + (data.lastLinesRemoved || 0) + '</div>' + (data.lastTotalWebSearchRequests > 0 ? '<div class="stat-mini">🔍 ' + t.webSearchRequests + ': ' + data.lastTotalWebSearchRequests + '</div>' : '') + '</div><div class="project-indicators">' + (data.hasTrustDialogAccepted ? '<span class="indicator trusted">' + t.trusted + '</span>' : '<span class="indicator untrusted">' + t.untrusted + '</span>') + (data.hasCompletedProjectOnboarding ? '<span class="indicator onboarded">' + t.completed + '</span>' : '<span class="indicator not-onboarded">' + t.notCompleted + '</span>') + ((data.enabledMcpjsonServers || []).length > 0 ? '<span class="indicator mcp">🔌 MCP</span>' : '') + '</div><div style="margin-top: 15px;"><div style="font-size: 12px; color: var(--vscode-descriptionForeground); margin-bottom: 8px;">' + t.recentChats + ':</div>' + chatsHtml + '</div><div class="session-info">' + t.sessionInfo + ': ' + (data.lastSessionId ? data.lastSessionId.substring(0, 8) + '...' : t.none) + '</div></div>';
            }).join('');

            // 更新统计信息
            document.getElementById('totalProjects').textContent = projects.length;
            document.getElementById('totalChats').textContent = totalChats;
            document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(4);
            document.getElementById('stats').style.display = 'flex';

            // 更新内容
            document.getElementById('content').innerHTML = 
                '<div class="projects-grid">' +
                    projectsHtml +
                '</div>';
        }

        function renderSingleChat(chatData, projectPath, projectData = null) {
            // 检查是否有有效的聊天数据
            if (!chatData || !chatData.display) {
                document.getElementById('content').innerHTML = '<div class="no-data">' + t.errorLoadingChat + '</div>';
                return;
            }
            
            // 显示返回按钮和更新标题
            document.getElementById('backBtn').style.display = 'flex';
            const projectName = projectPath ? projectPath.split('/').pop() : 'Unknown Project';
            document.getElementById('pageTitle').textContent = projectName + ' - ' + t.chatDetails;
            
            // 生成项目元数据HTML（如果有项目数据）
            let metadataHtml = '';
            if (projectData && projectPath) {
                metadataHtml = '<div class="project-chat-view">' +
                    '<div class="project-header">' +
                        '<h2>' + projectName + '</h2>' +
                        '<div class="project-stats">' +
                            '<span class="stat-badge">' + (projectData.history?.length || 0) + ' ' + t.chatCount + '</span>' +
                            '<span class="stat-badge">' + t.cost + ': $' + (projectData.lastCost || 0).toFixed(4) + '</span>' +
                        '</div>' +
                    '</div>' +
                    generateProjectMetadata(projectData) +
                '</div>';
            }
            
            const content = metadataHtml +
                '<div class="single-chat">' +
                    '<h3>' + t.chatContent + '</h3>' +
                    '<div class="chat-display">' + chatData.display + '</div>' +
                    (chatData.pastedContents && Object.keys(chatData.pastedContents).length > 0 ? 
                        '<h4>' + t.pastedContent + ':</h4><pre>' + JSON.stringify(chatData.pastedContents, null, 2) + '</pre>' : 
                        ''
                    ) +
                '</div>';
            document.getElementById('content').innerHTML = content;
            document.getElementById('stats').style.display = 'none';
        }

        function backToMain() {
            // 发送导航返回消息
            vscode.postMessage({ command: 'navigateBack' });
        }

        function openProject(projectPath) {
            // 发送导航到项目消息
            vscode.postMessage({ 
                command: 'navigateToProject',
                projectPath: projectPath
            });
        }

        function renderProjectChats(projectPath, projectData) {
            // 存储当前项目数据
            currentProjectPath = projectPath;
            currentProjectData = projectData;
            
            // 显示返回按钮和更新标题
            document.getElementById('backBtn').style.display = 'flex';
            const projectName = projectPath.split('/').pop() || projectPath;
            document.getElementById('pageTitle').textContent = projectName + ' - ' + t.chatDetails;
            
            const history = projectData.history || [];
            
            // 生成项目元数据HTML
            const metadataHtml = generateProjectMetadata(projectData);
            
            if (history.length === 0) {
                document.getElementById('content').innerHTML = 
                    '<div class="project-chat-view">' +
                        '<div class="project-header">' +
                            '<h2>' + projectName + '</h2>' +
                        '</div>' +
                        metadataHtml +
                        '<div class="no-data">' + t.noChatsInProject + '</div>' +
                    '</div>';
                document.getElementById('stats').style.display = 'none';
                return;
            }

            // 渲染聊天记录列表
            const chatsHtml = history.map((chat, index) => {
                const chatId = 'chat-' + index;
                const isLongMessage = chat.display.length > 200;
                const preview = isLongMessage ? chat.display.substring(0, 200) + '...' : chat.display;
                
                return '<div class="chat-message" onclick="navigateToChat(' + index + ', \\'' + projectPath + '\\')"><div class="chat-header"><div class="chat-avatar">💬</div><div class="chat-meta-info"><div class="chat-index">#' + (index + 1) + '</div><div class="chat-timestamp">' + formatChatTime(index) + '</div></div><div class="chat-actions">→</div></div><div class="chat-content"><div class="chat-preview">' + preview + '</div></div>' + (chat.pastedContents && Object.keys(chat.pastedContents).length > 0 ? '<div class="chat-attachments"><div class="attachment-icon">📎</div><span>' + t.attachments + '</span></div>' : '') + '</div>';
            }).join('');

            const content = '<div class="project-chat-view"><div class="project-header"><h2>' + projectName + '</h2><div class="project-stats"><span class="stat-badge">' + history.length + ' ' + t.chatCount + '</span><span class="stat-badge">' + t.cost + ': $' + (projectData.lastCost || 0).toFixed(4) + '</span></div></div>' + metadataHtml + '<div class="chat-list-container">' + chatsHtml + '</div></div>';
            
            document.getElementById('content').innerHTML = content;
            document.getElementById('stats').style.display = 'none';
        }

        function navigateToChat(chatIndex, projectPath) {
            if (!currentProjectData || !currentProjectData.history) {
                console.error('当前项目数据不存在');
                return;
            }
            
            const chatData = currentProjectData.history[chatIndex];
            if (!chatData) {
                console.error('聊天数据不存在:', chatIndex);
                return;
            }
            
            // 发送导航到聊天消息
            vscode.postMessage({
                command: 'navigateToChat',
                chatData: chatData,
                projectPath: projectPath
            });
        }

        function generateProjectMetadata(projectData) {
            return '<div class="project-metadata">' +
                '<button class="toggle-metadata" onclick="toggleMetadataVisibility()">' + t.showHideDetails + '</button>' +
                '<div id="metadataContent" style="display: block;">' +
                    // 基本信息
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">' + t.projectStats + '</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem(t.chatNumber, (projectData.history || []).length, 'number') +
                            createMetadataItem(t.totalCost, '$' + (projectData.lastCost || 0).toFixed(4), 'number') +
                            createMetadataItem(t.apiDuration, formatDuration(projectData.lastAPIDuration || 0)) +
                            createMetadataItem(t.totalDuration, formatDuration(projectData.lastDuration || 0)) +
                            createMetadataItem(t.inputTokens, (projectData.lastTotalInputTokens || 0).toLocaleString(), 'number') +
                            createMetadataItem(t.outputTokens, (projectData.lastTotalOutputTokens || 0).toLocaleString(), 'number') +
                        '</div>' +
                    '</div>' +
                    
                    // 缓存信息
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">' + t.cacheStats + '</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem(t.cacheCreationTokens, (projectData.lastTotalCacheCreationInputTokens || 0).toLocaleString(), 'number') +
                            createMetadataItem(t.cacheReadTokens, (projectData.lastTotalCacheReadInputTokens || 0).toLocaleString(), 'number') +
                            createMetadataItem(t.linesAdded, (projectData.lastLinesAdded || 0).toLocaleString(), 'number') +
                            createMetadataItem(t.linesRemoved, (projectData.lastLinesRemoved || 0).toLocaleString(), 'number') +
                        '</div>' +
                    '</div>' +
                    
                    // 项目配置
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">' + t.projectConfig + '</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem(t.trustDialog, projectData.hasTrustDialogAccepted, 'boolean') +
                            createMetadataItem(t.projectOnboarding, projectData.hasCompletedProjectOnboarding, 'boolean') +
                            createMetadataItem(t.onboardingCount, projectData.projectOnboardingSeenCount || 0, 'number') +
                            createMetadataItem(t.claudeMdIncludes, projectData.hasClaudeMdExternalIncludesApproved, 'boolean') +
                            createMetadataItem(t.mdWarningShown, projectData.hasClaudeMdExternalIncludesWarningShown, 'boolean') +
                            createMetadataItem(t.webSearchRequests, projectData.lastTotalWebSearchRequests || 0, 'number') +
                        '</div>' +
                    '</div>' +
                    
                    // MCP服务器
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">' + t.mcpServers + '</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem(t.allowedTools, (projectData.allowedTools || []).length ? (projectData.allowedTools || []).join(', ') : t.none) +
                            createMetadataItem(t.enabledMcpServers, (projectData.enabledMcpjsonServers || []).length ? (projectData.enabledMcpjsonServers || []).join(', ') : t.none) +
                            createMetadataItem(t.disabledMcpServers, (projectData.disabledMcpjsonServers || []).length ? (projectData.disabledMcpjsonServers || []).join(', ') : t.none) +
                        '</div>' +
                        (projectData.mcpServers && Object.keys(projectData.mcpServers).length > 0 ? 
                            '<div class="mcp-servers">' +
                                '<div class="metadata-title">' + t.mcpServerDetails + ':</div>' +
                                '<pre style="font-size: 11px; margin: 0;">' + JSON.stringify(projectData.mcpServers, null, 2) + '</pre>' +
                            '</div>' : ''
                        ) +
                    '</div>' +
                    
                    // 会话信息
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">' + t.sessionInfo_title + '</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem(t.lastSessionId, projectData.lastSessionId || t.none) +
                            createMetadataItem(t.mcpContextUris, (projectData.mcpContextUris || []).length ? (projectData.mcpContextUris || []).join(', ') : t.none) +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }

        function createMetadataItem(label, value, type = 'text') {
            const valueClass = type === 'boolean' ? 'boolean' : (type === 'number' ? 'number' : '');
            const displayValue = type === 'boolean' ? (value ? t.yes : t.no) : value;
            
            return '<div class="metadata-item">' +
                '<span class="metadata-label">' + label + ':</span>' +
                '<span class="metadata-value ' + valueClass + '">' + displayValue + '</span>' +
            '</div>';
        }

        function formatDuration(ms) {
            if (!ms || ms === 0) return '0ms';
            
            const seconds = Math.floor(ms / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            
            if (hours > 0) {
                return hours + 'h ' + (minutes % 60) + 'm ' + (seconds % 60) + 's';
            } else if (minutes > 0) {
                return minutes + 'm ' + (seconds % 60) + 's';
            } else if (seconds > 0) {
                return seconds + 's';
            } else {
                return ms + 'ms';
            }
        }

        function toggleMetadataVisibility() {
            const content = document.getElementById('metadataContent');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        }

        function toggleChatExpansion(chatId) {
            const preview = document.getElementById(chatId + '-preview');
            const full = document.getElementById(chatId + '-full');
            const expandIcon = event.currentTarget.querySelector('.expand-icon');
            
            if (full) {
                if (full.style.display === 'none') {
                    preview.style.display = 'none';
                    full.style.display = 'block';
                    if (expandIcon) expandIcon.textContent = '▲';
                } else {
                    preview.style.display = 'block';
                    full.style.display = 'none';
                    if (expandIcon) expandIcon.textContent = '▼';
                }
            }
        }

        function formatChatTime(index) {
            const now = new Date();
            const offsetDays = Math.floor(index / 10);
            const chatDate = new Date(now.getTime() - offsetDays * 24 * 60 * 60 * 1000);
            return chatDate.toLocaleDateString('zh-CN', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function exportData() {
            vscode.postMessage({ command: 'exportData' });
        }

        // 搜索功能
        document.getElementById('searchInput').addEventListener('input', (e) => {
            currentFilter = e.target.value.toLowerCase();
            if (allData) {
                renderFilteredProjects();
            }
        });

        function renderFilteredProjects() {
            if (!allData || !allData.projects) return;

            const projects = Object.entries(allData.projects).filter(([path, data]) => {
                const projectName = path.split('/').pop() || path;
                const hasMatchingChat = (data.history || []).some(chat => 
                    chat.display.toLowerCase().includes(currentFilter)
                );
                return projectName.toLowerCase().includes(currentFilter) || hasMatchingChat;
            });

            if (projects.length === 0) {
                document.getElementById('content').innerHTML = '<div class="no-data">' + t.noMatchingRecords + '</div>';
                return;
            }

            // 重新渲染过滤后的项目
            renderAllProjects();
        }
    </script>
</body>
</html>`;
}