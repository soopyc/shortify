const colors = [
    '#ebadd4',
    '#ffafc5',
    '#f2befc',
    '#f1c0f5',
    '#e0c6ff',
    '#ead5e6',
    '#f3e0ec',
    '#fdcbdb',
    '#ffe0d7',
    '#fedcba',
    '#ffef9f',
    '#ffe593',
    '#cafed6',
    '#c1fba4',
    '#b5e587',
    '#7bf1a8',
    '#90f1ef',
    '#d2fdff',
    '#abcdef',
    '#bacafe',
];

export async function load() {
    return {
        app_color: colors[Math.floor(Math.random() * colors.length)],
    }
}
