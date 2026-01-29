import path from "path";
import fs from "fs";

export function findGitRoot(startPath: string): string | null {
  let current = fs.statSync(startPath).isDirectory()
    ? startPath
    : path.dirname(startPath);

  while (true) {
    if (fs.existsSync(path.join(current, ".git"))) return current;

    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  return null;
}

export function isInside(base: string, target: string) {
  const rel = path.relative(base, target);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}


export function existsInside(repoRoot: string, targetPath: string) {
  const absRepo = path.resolve(repoRoot);
  const absTarget = path.resolve(targetPath);

  if (!absTarget.startsWith(absRepo)) return false;
  return fs.existsSync(absTarget);
}