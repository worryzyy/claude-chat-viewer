export function getWebviewContent(extensionUri: any): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude 聊天记录查看器</title>
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
                    ← 返回
                </button>
                <h1 id="pageTitle">Claude 聊天记录查看器</h1>
            </div>
            <div>
                <input type="text" class="search-box" placeholder="搜索聊天记录..." id="searchInput">
                <button class="export-btn" onclick="exportData()">导出数据</button>
            </div>
        </div>

        <div id="stats" class="stats" style="display: none;">
            <div class="stat-item">
                <div class="stat-number" id="totalProjects">0</div>
                <div class="stat-label">项目总数</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="totalChats">0</div>
                <div class="stat-label">对话总数</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="totalCost">$0</div>
                <div class="stat-label">总花费</div>
            </div>
        </div>

        <div id="content" class="loading">
            正在加载聊天记录...
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let allData = null;
        let currentProjectData = null;
        let currentProjectPath = null;
        let currentFilter = '';

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
                document.getElementById('content').innerHTML = '<div class="no-data">没有找到聊天记录数据</div>';
                return;
            }

            // 隐藏返回按钮，显示主界面标题
            document.getElementById('backBtn').style.display = 'none';
            document.getElementById('pageTitle').textContent = 'Claude 聊天记录查看器';

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

                return '<div class="project-card" onclick="openProject(\\'' + path + '\\')"><div class="project-name">' + projectName + '</div><div class="project-path">' + path + '</div><div class="chat-meta"><span class="chat-count">' + chatCount + ' 条对话</span><span>花费: $' + cost.toFixed(4) + '</span></div><div class="project-stats-mini"><div class="stat-mini">📥 输入: ' + (data.lastTotalInputTokens || 0).toLocaleString() + '</div><div class="stat-mini">📤 输出: ' + (data.lastTotalOutputTokens || 0).toLocaleString() + '</div><div class="stat-mini">➕ 增加: ' + (data.lastLinesAdded || 0) + ' 行</div><div class="stat-mini">➖ 删除: ' + (data.lastLinesRemoved || 0) + ' 行</div>' + (data.lastTotalWebSearchRequests > 0 ? '<div class="stat-mini">🔍 搜索: ' + data.lastTotalWebSearchRequests + ' 次</div>' : '') + '</div><div class="project-indicators">' + (data.hasTrustDialogAccepted ? '<span class="indicator trusted">🔒 已信任</span>' : '<span class="indicator untrusted">🔓 未信任</span>') + (data.hasCompletedProjectOnboarding ? '<span class="indicator onboarded">✅ 已引导</span>' : '<span class="indicator not-onboarded">❌ 未引导</span>') + ((data.enabledMcpjsonServers || []).length > 0 ? '<span class="indicator mcp">🔌 MCP</span>' : '') + '</div><div style="margin-top: 15px;"><div style="font-size: 12px; color: var(--vscode-descriptionForeground); margin-bottom: 8px;">最近对话:</div>' + chatsHtml + '</div><div class="session-info">会话: ' + (data.lastSessionId ? data.lastSessionId.substring(0, 8) + '...' : '无') + '</div></div>';
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
                document.getElementById('content').innerHTML = '<div class="no-data">无法加载聊天记录数据</div>';
                return;
            }
            
            // 显示返回按钮和更新标题
            document.getElementById('backBtn').style.display = 'flex';
            const projectName = projectPath ? projectPath.split('/').pop() : '未知项目';
            document.getElementById('pageTitle').textContent = projectName + ' - 对话详情';
            
            // 生成项目元数据HTML（如果有项目数据）
            let metadataHtml = '';
            if (projectData && projectPath) {
                metadataHtml = '<div class="project-chat-view">' +
                    '<div class="project-header">' +
                        '<h2>' + projectName + '</h2>' +
                        '<div class="project-stats">' +
                            '<span class="stat-badge">' + (projectData.history?.length || 0) + ' 条对话</span>' +
                            '<span class="stat-badge">花费: $' + (projectData.lastCost || 0).toFixed(4) + '</span>' +
                        '</div>' +
                    '</div>' +
                    generateProjectMetadata(projectData) +
                '</div>';
            }
            
            const content = metadataHtml +
                '<div class="single-chat">' +
                    '<h3>对话内容</h3>' +
                    '<div class="chat-display">' + chatData.display + '</div>' +
                    (chatData.pastedContents && Object.keys(chatData.pastedContents).length > 0 ? 
                        '<h4>粘贴内容:</h4><pre>' + JSON.stringify(chatData.pastedContents, null, 2) + '</pre>' : 
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
            document.getElementById('pageTitle').textContent = projectName + ' - 聊天记录';
            
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
                        '<div class="no-data">该项目暂无聊天记录</div>' +
                    '</div>';
                document.getElementById('stats').style.display = 'none';
                return;
            }

            // 渲染聊天记录列表
            const chatsHtml = history.map((chat, index) => {
                const chatId = 'chat-' + index;
                const isLongMessage = chat.display.length > 200;
                const preview = isLongMessage ? chat.display.substring(0, 200) + '...' : chat.display;
                
                return '<div class="chat-message" onclick="navigateToChat(' + index + ', \\'' + projectPath + '\\')"><div class="chat-header"><div class="chat-avatar">💬</div><div class="chat-meta-info"><div class="chat-index">#' + (index + 1) + '</div><div class="chat-timestamp">' + formatChatTime(index) + '</div></div><div class="chat-actions">→</div></div><div class="chat-content"><div class="chat-preview">' + preview + '</div></div>' + (chat.pastedContents && Object.keys(chat.pastedContents).length > 0 ? '<div class="chat-attachments"><div class="attachment-icon">📎</div><span>包含附件内容</span></div>' : '') + '</div>';
            }).join('');

            const content = '<div class="project-chat-view"><div class="project-header"><h2>' + projectName + '</h2><div class="project-stats"><span class="stat-badge">' + history.length + ' 条对话</span><span class="stat-badge">花费: $' + (projectData.lastCost || 0).toFixed(4) + '</span></div></div>' + metadataHtml + '<div class="chat-list-container">' + chatsHtml + '</div></div>';
            
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
                '<button class="toggle-metadata" onclick="toggleMetadataVisibility()">📊 显示/隐藏项目详细信息</button>' +
                '<div id="metadataContent" style="display: block;">' +
                    // 基本信息
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">📊 项目统计</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem('聊天数量', (projectData.history || []).length, 'number') +
                            createMetadataItem('总花费', '$' + (projectData.lastCost || 0).toFixed(4), 'number') +
                            createMetadataItem('API持续时间', formatDuration(projectData.lastAPIDuration || 0)) +
                            createMetadataItem('总持续时间', formatDuration(projectData.lastDuration || 0)) +
                            createMetadataItem('输入Token', (projectData.lastTotalInputTokens || 0).toLocaleString(), 'number') +
                            createMetadataItem('输出Token', (projectData.lastTotalOutputTokens || 0).toLocaleString(), 'number') +
                        '</div>' +
                    '</div>' +
                    
                    // 缓存信息
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">🗄️ 缓存统计</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem('缓存创建Token', (projectData.lastTotalCacheCreationInputTokens || 0).toLocaleString(), 'number') +
                            createMetadataItem('缓存读取Token', (projectData.lastTotalCacheReadInputTokens || 0).toLocaleString(), 'number') +
                            createMetadataItem('代码行添加', (projectData.lastLinesAdded || 0).toLocaleString(), 'number') +
                            createMetadataItem('代码行删除', (projectData.lastLinesRemoved || 0).toLocaleString(), 'number') +
                        '</div>' +
                    '</div>' +
                    
                    // 项目配置
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">⚙️ 项目配置</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem('信任对话框', projectData.hasTrustDialogAccepted, 'boolean') +
                            createMetadataItem('项目引导完成', projectData.hasCompletedProjectOnboarding, 'boolean') +
                            createMetadataItem('引导显示次数', projectData.projectOnboardingSeenCount || 0, 'number') +
                            createMetadataItem('Claude MD外部包含', projectData.hasClaudeMdExternalIncludesApproved, 'boolean') +
                            createMetadataItem('MD警告显示', projectData.hasClaudeMdExternalIncludesWarningShown, 'boolean') +
                            createMetadataItem('网络搜索请求', projectData.lastTotalWebSearchRequests || 0, 'number') +
                        '</div>' +
                    '</div>' +
                    
                    // MCP服务器
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">🔌 MCP 服务器</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem('允许的工具', (projectData.allowedTools || []).length ? (projectData.allowedTools || []).join(', ') : '无') +
                            createMetadataItem('启用的MCP服务器', (projectData.enabledMcpjsonServers || []).length ? (projectData.enabledMcpjsonServers || []).join(', ') : '无') +
                            createMetadataItem('禁用的MCP服务器', (projectData.disabledMcpjsonServers || []).length ? (projectData.disabledMcpjsonServers || []).join(', ') : '无') +
                        '</div>' +
                        (projectData.mcpServers && Object.keys(projectData.mcpServers).length > 0 ? 
                            '<div class="mcp-servers">' +
                                '<div class="metadata-title">MCP服务器详情:</div>' +
                                '<pre style="font-size: 11px; margin: 0;">' + JSON.stringify(projectData.mcpServers, null, 2) + '</pre>' +
                            '</div>' : ''
                        ) +
                    '</div>' +
                    
                    // 会话信息
                    '<div class="metadata-section">' +
                        '<div class="metadata-title">🔗 会话信息</div>' +
                        '<div class="metadata-grid">' +
                            createMetadataItem('最后会话ID', projectData.lastSessionId || '无') +
                            createMetadataItem('MCP上下文URI', (projectData.mcpContextUris || []).length ? (projectData.mcpContextUris || []).join(', ') : '无') +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }

        function createMetadataItem(label, value, type = 'text') {
            const valueClass = type === 'boolean' ? 'boolean' : (type === 'number' ? 'number' : '');
            const displayValue = type === 'boolean' ? (value ? '✅ 是' : '❌ 否') : value;
            
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
                document.getElementById('content').innerHTML = '<div class="no-data">没有找到匹配的聊天记录</div>';
                return;
            }

            // 重新渲染过滤后的项目
            renderAllProjects();
        }
    </script>
</body>
</html>`;
}