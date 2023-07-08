const colors = [
    '#90f1ef',
    '#ffef9f',
    '#f2befc',
    '#c1fba4',
    '#7bf1a8',
    '#ebadd4',
    '#ffafc5',
    '#cafed6',
    '#d2fdff'
];

export async function load() {
    return {
        app_color: colors[Math.floor(Math.random() * colors.length)],
    }
}
