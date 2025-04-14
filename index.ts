#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import open from 'open';

function getCurrentBranch(): string {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    if (!branch) {
      throw new Error('No branch found.');
    }
    return branch;
  } catch (error) {
    console.error('Error: Unable to determine the current Git branch.');
    process.exit(1);
  }
}

function getRemoteUrl(): string {
  try {
    const url = execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim();
    if (!url) {
      throw new Error('No remote URL found.');
    }
    return url;
  } catch (error) {
    console.error('Error: Unable to retrieve the remote repository URL.');
    process.exit(1);
  }
}

function convertToHttps(url: string): string {
  if (url.startsWith('git@')) {
    // Convert SSH URL to HTTPS
    const httpsUrl = url.replace(/^git@([^:]+):/, 'https://$1/').replace(/\.git$/, '');
    return httpsUrl;
  } else if (url.startsWith('https://')) {
    // Remove .git suffix if present
    return url.replace(/\.git$/, '');
  } else {
    console.error('Error: Unsupported remote URL format.');
    process.exit(1);
  }
}

function openDraftPR(repoUrl: string, branch: string) {
  const prUrl = `${repoUrl}/compare/develop...${branch}?expand=1&title=${encodeURIComponent(branch)}&draft=true`;
  open(prUrl).catch(() => {
    console.error('Error: Unable to open the browser.');
    process.exit(1);
  });
}

function main() {
  const branch = getCurrentBranch();
  const remoteUrl = getRemoteUrl();
  const httpsUrl = convertToHttps(remoteUrl);
  openDraftPR(httpsUrl, branch);
}

main();
