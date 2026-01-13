const formatDate = (date: Date | undefined) =>
    date instanceof Date ? date.toISOString().slice(0, 10) : "";

const extractExcerpt = (body: string) => {
    const lines = body.split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith("#")) continue;
        return trimmed.replace(/^[-*]\s+/, "");
    }
    return "";
};

type Entry = {
    slug: string;
    data: {
        title: string;
        date?: Date;
    };
    body?: string;
};

export type TreeItem = {
    title: string;
    href: string;
    date?: string;
    desc?: string;
    children?: TreeItem[];
    isFolder?: boolean;
};

export const buildListing = (
    entries: Entry[],
    basePath: string,
    prefix = ""
) => {
    const folderMap = new Map<string, { folderItem: TreeItem; children: TreeItem[] }>();
    const fileItems: TreeItem[] = [];

    for (const item of entries) {
        if (!item.slug.startsWith(prefix)) continue;
        const rest = item.slug.slice(prefix.length);
        const parts = rest.split("/").filter(Boolean);
        if (parts.length === 0) continue;
        if (parts.length === 1) {
            fileItems.push({
                title: item.data.title,
                date: formatDate(item.data.date),
                href: `${basePath}/${prefix}${parts[0]}`,
                desc: extractExcerpt(item.body || ""),
            });
            continue;
        }

        const [folder, child] = parts;
        if (!folderMap.has(folder)) {
            folderMap.set(folder, {
                folderItem: {
                    title: `/${folder}`,
                    href: `${basePath}/${prefix}${folder}`,
                    isFolder: true,
                },
                children: [],
            });
        }

        if (parts.length === 2) {
            folderMap.get(folder)?.children.push({
                title: item.data.title,
                date: formatDate(item.data.date),
                href: `${basePath}/${prefix}${folder}/${child}`,
            });
        } else if (child) {
            const children = folderMap.get(folder)?.children ?? [];
            const exists = children.some((c) => c.title === `/${child}`);
            if (!exists) {
                children.push({
                    title: `/${child}`,
                    href: `${basePath}/${prefix}${folder}/${child}`,
                    isFolder: true,
                });
            }
        }
    }

    fileItems.sort((a, b) => (a.date && b.date && a.date < b.date ? 1 : -1));

    const ordered: TreeItem[] = [];
    ordered.push(...fileItems);

    const folders = Array.from(folderMap.values()).sort((a, b) =>
        a.folderItem.title.localeCompare(b.folderItem.title)
    );

    for (const folder of folders) {
        folder.children.sort((a, b) => a.title.localeCompare(b.title));
        ordered.push({
            ...folder.folderItem,
            children: folder.children,
        });
    }

    return ordered;
};
