export function setIcon(extension?) {
    const config = {
        'pdf': 'file-pdf-o',
        'doc': 'file-word-o',
        'docx': 'file-word-o',
        'png': 'file-image-o',
    };
    return config[extension] ? config[extension] : 'file-o';
}
