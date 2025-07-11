import * as path from 'path';
import * as os from 'os';

export function getClaudeConfigPath(): string {
    const configPath = '~/.claude.json';
    
    if (configPath.startsWith('~')) {
        return path.join(os.homedir(), configPath.substring(1));
    }
    return configPath;
}