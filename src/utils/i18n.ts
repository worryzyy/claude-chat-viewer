import * as vscode from 'vscode';

export interface I18nMessages {
    // 基本界面
    title: string;
    loading: string;
    noData: string;
    search: string;
    export: string;
    back: string;
    
    // 统计信息
    totalProjects: string;
    totalChats: string;
    totalCost: string;
    chatCount: string;
    cost: string;
    
    // 项目相关
    projectDetails: string;
    chatDetails: string;
    chatContent: string;
    pastedContent: string;
    recentChats: string;
    projectPath: string;
    sessionInfo: string;
    
    // 项目统计
    projectStats: string;
    chatNumber: string;
    apiDuration: string;
    totalDuration: string;
    inputTokens: string;
    outputTokens: string;
    
    // 缓存统计
    cacheStats: string;
    cacheCreationTokens: string;
    cacheReadTokens: string;
    linesAdded: string;
    linesRemoved: string;
    
    // 项目配置
    projectConfig: string;
    trustDialog: string;
    projectOnboarding: string;
    onboardingCount: string;
    claudeMdIncludes: string;
    mdWarningShown: string;
    webSearchRequests: string;
    
    // MCP服务器
    mcpServers: string;
    allowedTools: string;
    enabledMcpServers: string;
    disabledMcpServers: string;
    mcpServerDetails: string;
    
    // 会话信息
    sessionInfo_title: string;
    lastSessionId: string;
    mcpContextUris: string;
    
    // 状态
    trusted: string;
    untrusted: string;
    completed: string;
    notCompleted: string;
    yes: string;
    no: string;
    none: string;
    
    // 错误信息
    errorLoadingChat: string;
    noMatchingRecords: string;
    noChatsInProject: string;
    
    // 按钮和操作
    showHideDetails: string;
    attachments: string;
}

const messages: { [key: string]: I18nMessages } = {
    'zh-cn': {
        // 基本界面
        title: 'Claude 聊天记录查看器',
        loading: '正在加载聊天记录...',
        noData: '没有找到聊天记录数据',
        search: '搜索聊天记录...',
        export: '导出数据',
        back: '返回',
        
        // 统计信息
        totalProjects: '项目总数',
        totalChats: '对话总数',
        totalCost: '总花费',
        chatCount: '条对话',
        cost: '花费',
        
        // 项目相关
        projectDetails: '项目详情',
        chatDetails: '对话详情',
        chatContent: '对话内容',
        pastedContent: '粘贴内容',
        recentChats: '最近对话',
        projectPath: '项目路径',
        sessionInfo: '会话',
        
        // 项目统计
        projectStats: '📊 项目统计',
        chatNumber: '聊天数量',
        apiDuration: 'API持续时间',
        totalDuration: '总持续时间',
        inputTokens: '输入Token',
        outputTokens: '输出Token',
        
        // 缓存统计
        cacheStats: '🗄️ 缓存统计',
        cacheCreationTokens: '缓存创建Token',
        cacheReadTokens: '缓存读取Token',
        linesAdded: '代码行添加',
        linesRemoved: '代码行删除',
        
        // 项目配置
        projectConfig: '⚙️ 项目配置',
        trustDialog: '信任对话框',
        projectOnboarding: '项目引导完成',
        onboardingCount: '引导显示次数',
        claudeMdIncludes: 'Claude MD外部包含',
        mdWarningShown: 'MD警告显示',
        webSearchRequests: '网络搜索请求',
        
        // MCP服务器
        mcpServers: '🔌 MCP 服务器',
        allowedTools: '允许的工具',
        enabledMcpServers: '启用的MCP服务器',
        disabledMcpServers: '禁用的MCP服务器',
        mcpServerDetails: 'MCP服务器详情',
        
        // 会话信息
        sessionInfo_title: '🔗 会话信息',
        lastSessionId: '最后会话ID',
        mcpContextUris: 'MCP上下文URI',
        
        // 状态
        trusted: '🔒 已信任',
        untrusted: '🔓 未信任',
        completed: '✅ 已完成',
        notCompleted: '❌ 未完成',
        yes: '✅ 是',
        no: '❌ 否',
        none: '无',
        
        // 错误信息
        errorLoadingChat: '无法加载聊天记录数据',
        noMatchingRecords: '没有找到匹配的聊天记录',
        noChatsInProject: '该项目暂无聊天记录',
        
        // 按钮和操作
        showHideDetails: '📊 显示/隐藏项目详细信息',
        attachments: '包含附件内容'
    },
    
    'en': {
        // 基本界面
        title: 'Claude Chat Records Viewer',
        loading: 'Loading chat records...',
        noData: 'No chat record data found',
        search: 'Search chat records...',
        export: 'Export Data',
        back: 'Back',
        
        // 统计信息
        totalProjects: 'Total Projects',
        totalChats: 'Total Chats',
        totalCost: 'Total Cost',
        chatCount: ' conversations',
        cost: 'Cost',
        
        // 项目相关
        projectDetails: 'Project Details',
        chatDetails: 'Chat Details',
        chatContent: 'Chat Content',
        pastedContent: 'Pasted Content',
        recentChats: 'Recent Chats',
        projectPath: 'Project Path',
        sessionInfo: 'Session',
        
        // 项目统计
        projectStats: '📊 Project Statistics',
        chatNumber: 'Chat Count',
        apiDuration: 'API Duration',
        totalDuration: 'Total Duration',
        inputTokens: 'Input Tokens',
        outputTokens: 'Output Tokens',
        
        // 缓存统计
        cacheStats: '🗄️ Cache Statistics',
        cacheCreationTokens: 'Cache Creation Tokens',
        cacheReadTokens: 'Cache Read Tokens',
        linesAdded: 'Lines Added',
        linesRemoved: 'Lines Removed',
        
        // 项目配置
        projectConfig: '⚙️ Project Configuration',
        trustDialog: 'Trust Dialog',
        projectOnboarding: 'Project Onboarding',
        onboardingCount: 'Onboarding Count',
        claudeMdIncludes: 'Claude MD External Includes',
        mdWarningShown: 'MD Warning Shown',
        webSearchRequests: 'Web Search Requests',
        
        // MCP服务器
        mcpServers: '🔌 MCP Servers',
        allowedTools: 'Allowed Tools',
        enabledMcpServers: 'Enabled MCP Servers',
        disabledMcpServers: 'Disabled MCP Servers',
        mcpServerDetails: 'MCP Server Details',
        
        // 会话信息
        sessionInfo_title: '🔗 Session Information',
        lastSessionId: 'Last Session ID',
        mcpContextUris: 'MCP Context URIs',
        
        // 状态
        trusted: '🔒 Trusted',
        untrusted: '🔓 Untrusted',
        completed: '✅ Completed',
        notCompleted: '❌ Not Completed',
        yes: '✅ Yes',
        no: '❌ No',
        none: 'None',
        
        // 错误信息
        errorLoadingChat: 'Unable to load chat record data',
        noMatchingRecords: 'No matching chat records found',
        noChatsInProject: 'No chat records in this project',
        
        // 按钮和操作
        showHideDetails: '📊 Show/Hide Project Details',
        attachments: 'Contains attachments'
    }
};

export function getCurrentLanguage(): string {
    try {
        // 从VS Code配置中获取语言设置
        const config = vscode.workspace.getConfiguration('claudeChat');
        const language = config.get('language') as string;
        
        // 验证语言设置是否有效
        if (language === 'zh-cn' || language === 'en') {
            return language;
        }
        
        // 默认返回中文
        return 'zh-cn';
    } catch (error) {
        // 如果无法获取配置，默认返回中文
        return 'zh-cn';
    }
}

export function getMessages(language?: string): I18nMessages {
    const lang = language || getCurrentLanguage();
    return messages[lang] || messages['en'];
}

export function t(key: keyof I18nMessages, language?: string): string {
    const msgs = getMessages(language);
    return msgs[key] || key;
}