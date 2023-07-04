import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

export async function getJSON(file: string): Promise<Record<string, any>>{
    let boardJSON: string = "";
    setTimeout(() => readTextFile(`${file}.json`, { dir: BaseDirectory.App }).then(res => boardJSON = res), 1000);
    return JSON.parse(boardJSON)
}

export async function setJSON(file: string, object: object): Promise<void> {
    const jsonString: string = JSON.stringify(object);
    await writeTextFile({ path: `${file}.json`, contents: jsonString }, { dir: BaseDirectory.App });
}