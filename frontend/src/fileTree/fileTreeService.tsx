interface FileTreeResponse {
    json: string;
  }


export const buildFileTree = async(rootPath: string): Promise<string> => {
    const apiUrl = 'http://localhost:8080/api/filetree';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": rootPath
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data: FileTreeResponse = await response.json();
        return data.json;

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
}