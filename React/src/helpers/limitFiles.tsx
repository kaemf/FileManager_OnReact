export default function limitFiles(width: number) {
    if (width < 550) return 4;
    if (width < 1280) return 9;
    return 12;
}