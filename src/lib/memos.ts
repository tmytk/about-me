const formatDate = (date: Date | undefined) =>
    date instanceof Date ? date.toISOString().slice(0, 10).replaceAll("-", ".") : "";

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

export type MemoItem = {
    title: string;
    href: string;
    date?: string;
    desc?: string;
};

export const buildMemoItems = (entries: Entry[], basePath: string): MemoItem[] =>
    entries
        .map((item) => ({
            title: item.data.title,
            date: formatDate(item.data.date),
            href: `${basePath}/${item.slug}`,
            desc: extractExcerpt(item.body || ""),
        }))
        .sort((a, b) => (a.date && b.date && a.date < b.date ? 1 : -1));
