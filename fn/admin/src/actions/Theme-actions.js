const themeDark = changeTheme => ({
    type: 'THEME_DARK',
    payload: changeTheme,
});

const themeLight = changeTheme => ({
    type: 'THEME_LIGHT',
    payload: changeTheme,
});

export { themeDark, themeLight };
