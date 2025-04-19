export default function shortenFileName(fileName: string, maxLength: number = 20): string {
    if (fileName.length <= maxLength) {
        return fileName;
    }

    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === 0) {
        return fileName.slice(0, maxLength - 3) + '...';
    }

    const name = fileName.slice(0, dotIndex);
    const extension = fileName.slice(dotIndex);

    const availableLength = maxLength - extension.length - 3;

    if (availableLength <= 2) {
        return name.slice(0, 1) + '...' + extension;
    }

    const firstPartLength = Math.ceil(availableLength / 2);
    const secondPartLength = Math.floor(availableLength / 2);

    const firstPart = name.slice(0, firstPartLength);
    const secondPart = name.slice(-secondPartLength);

    return firstPart + '...' + secondPart + extension;
}