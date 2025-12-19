// DARK Mode STAR
function darkmode() {
    const options = {
        bottom: '64px', // default: '32px'
        right: '32px', // default: '32px'
        left: 'unset', // default: 'unset'
        time: '0.5s', // default: '0.3s'
        mixColor: '#fff', // default: '#fff'
        backgroundColor: '#fff',  // default: '#fff'
        buttonColorDark: '#100f2c',  // default: '#100f2c'
        buttonColorLight: '#fff', // default: '#fff'
        saveInCookies: true, // default: true,
        label: '<img width="48" height="48" src="https://img.icons8.com/color/48/batman.png" alt="batman"/>', // default: '🌓'
        autoMatchOsTheme: true // default: true
    };

    const darkmode = new Darkmode(options);
    darkmode.showWidget();
}
window.addEventListener('load', darkmode);
// // Dark Mode END










// Search hero and API
// const hero_APIkey 

// classs s

// async function hero_Search(params) {
    
// }
// fetch()