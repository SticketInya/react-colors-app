import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export default function generatePalette(starterPalette) {
    let newColors = {};

    levels.forEach((level) => {
        newColors[level] = [];
    });

    starterPalette.colors.forEach((color) => {
        const scale = getScale(color.color, levels.length);
        scale.forEach((hex, i) => {
            newColors[levels[i]].push({
                id: color.name.toLowerCase().replace(/ /g, '-'),
                name: `${color.name} ${levels[i]}`,
                hex: hex,
                rgb: chroma(hex).css(),
                rgba: chroma(hex).alpha(0.99).css(),
            });
        });
    });

    return { ...starterPalette, colors: { ...newColors } };
}

function getScale(hexColor, numOfColors) {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numOfColors);
}

function getRange(hexColor) {
    const darkest = chroma(hexColor).darken(1.4);
    const lightest = chroma(hexColor).brighten(1.9);
    return [lightest, hexColor, darkest];
}
