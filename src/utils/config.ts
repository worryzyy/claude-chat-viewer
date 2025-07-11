import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

export function getClaudeConfigPath(): string {
    // 先尝试常见的配置文件位置
    const possiblePaths = [
        // 标准位置
        path.join(os.homedir(), '.claude.json'),
        // WSL 环境下的 Windows 用户目录
        `/mnt/c/Users/${process.env.USERNAME || process.env.USER || 'Default'}/.claude.json`,
        // 如果在 WSL 中，尝试访问 Windows 用户目录的其他可能路径
        `/mnt/c/Users/${os.userInfo().username}/.claude.json`,
        // 当前目录
        path.join(process.cwd(), '.claude.json'),
        // 备用路径
        '/root/.claude.json'
    ];

    // 检查哪个路径存在
    for (const configPath of possiblePaths) {
        try {
            if (fs.existsSync(configPath)) {
                console.log(`Found Claude config at: ${configPath}`);
                return configPath;
            }
        } catch (error) {
            // 忽略访问错误，继续尝试下一个路径
            continue;
        }
    }

    // 如果没有找到任何现有文件，返回默认路径
    const defaultPath = path.join(os.homedir(), '.claude.json');
    console.log(`No existing config found, using default: ${defaultPath}`);
    return defaultPath;
}