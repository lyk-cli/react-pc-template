
// 1. 字体大小        https://www.yuque.com/braft-editor/be/gz44tn#5cwhhg
export const fontSizes = [
    // 1,
    // 4,
    // 8,
    12,
    14,
    16,
    18,
    20,
    24,
    // 28,
    // 30,
    // 32,
    // 36,
    // 40,
    // 48,
    // 56,
    // 64,
    // 72,
    // 96,
    // 120,
    // 144
];

// 2. 指定编辑器工具栏的控件列表       https://www.yuque.com/braft-editor/be/gz44tn#bo49ph
export const controls = [
    "undo",
    "redo",
    "separator",
    "font-size",
    "font-family",
    "line-height",
    "letter-spacing",
    "separator",
    "text-color",
    "bold",
    "italic",
    "underline",
    "strike-through",
    "separator",
    "superscript",
    "subscript",
    "remove-styles",
    // "emoji",//bug-12227-cwj liujiadan 让去掉的
    "separator",
    "text-indent",
    "text-align",
    "separator",
    "headings",
    "list-ul",
    "list-ol",
    // "blockquote",
    // "code",
    // "separator",
    // "link",
    "separator",
    "hr",
    "separator",
    "media",
    "separator",
    "clear"
];


export const getFontFamilies = () => {

    let fontFamilies = [];
    let agent = navigator.userAgent.toLowerCase();
    let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (
        agent.indexOf("win32") >= 0 ||
        agent.indexOf("wow32") >= 0 ||
        agent.indexOf("win64") >= 0 ||
        agent.indexOf("wow64") >= 0
    ) {
        fontFamilies = [
            // {
            //     name: "Araial",
            //     family: "Arial, Helvetica, sans-serif"
            // },
            // {
            //     name: "Georgia",
            //     family: "Georgia, serif"
            // },
            // {
            //     name: "Impact",
            //     family: "Impact, serif"
            // },
            // {
            //     name: "Monospace",
            //     family: '"Courier New", Courier, monospace'
            // },
            // {
            //     name: "Tahoma",
            //     family: 'tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif'
            // },
            {
                name: "黑体",
                family: "SimHei, 黑体"
            },
            {
                name: "宋体",
                family: "SimSun, 宋体"
            },
            {
                name: "仿宋",
                family: "FangSong, 仿宋"
            },
            {
                name: "新宋体",
                family: "NSimSun, 新宋体"
            },
            {
                name: "楷体",
                family: "KaiTi, 楷体, Helvetica, sans-serif"
            },
            {
                name: "微软雅黑",
                family: "微软雅黑, Microsoft YaHei , Helvetica, sans-serif"
            },
            {
                name: "微软正黑体",
                family: "微软正黑体, Microsoft JhengHei , Helvetica, sans-serif"
            }
        ];
    }
    if (isMac) {
        fontFamilies = [
            {
                name: "Araial",
                family: "Arial, Helvetica, sans-serif"
            },
            {
                name: "Georgia",
                family: "Georgia, serif"
            },
            {
                name: "Impact",
                family: "Impact, serif"
            },
            {
                name: "Monospace",
                family: '"Courier New", Courier, monospace'
            },
            {
                name: "Tahoma",
                family: 'tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif'
            },
            {
                name: "华文黑体",
                family: "STHeiti, 华文黑体"
            },
            {
                name: "华文宋体",
                family: "STSong, 华文宋体"
            },
            {
                name: "华文仿宋",
                family: "STFangsong, 华文仿宋"
            },
            {
                name: "华文楷体",
                family: "STKaiti, 华文楷体"
            },
            {
                name: "冬青黑体简",
                family: "Hiragino Sans GB, 冬青黑体简"
            },
            {
                name: "兰亭黑",
                family: "Lantinghei SC, 兰亭黑"
            },
            {
                name: "宋体",
                family: "Songti SC, 宋体"
            },
            {
                name: "娃娃体",
                family: "Wawati SC, 娃娃体"
            }
        ];
    }
    return fontFamilies;
}

// 3. 文字字体类型  https://www.yuque.com/braft-editor/be/gz44tn#7fvnkr
export const fontFamilies = getFontFamilies();


// 4. 指定编辑器内的图片工具栏的可用控件    https://www.yuque.com/braft-editor/be/gz44tn#d7c9zt
export const imageControls = [
    'float-left', // 设置图片左浮动
    'float-right', // 设置图片右浮动
    'align-left', // 设置图片居左
    'align-center', // 设置图片居中
    'align-right', // 设置图片居右
    'link', // 设置图片超链接
    'size', // 设置图片尺寸
    'remove' // 删除图片
];

// 5. 媒体控件

// 5.1 指定媒体库允许选择的本地文件的MIME类型    https://www.yuque.com/braft-editor/be/gz44tn#mupgqt
export const accepts = {
    image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
    video: 'video/mp4',
    audio: 'audio/mp3'
}
// 5.2  media.validateFn https://www.yuque.com/braft-editor/be/gz44tn#ufi0cu
export const validateFn = (size = 20 * 1204, file) => {
    return file.size < size;
}

// 5.3 测试媒体图片
export const mediaItems = [{
    id: new Date().getTime(),
    type: 'IMAGE',
    url: 'https://iagent-uat.metlife.com.cn/web/security-service/api/common/attachment/show?id=22d2229197299704a954acba22029b1e&UTOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtZXRsaWZlIiwiZXhwIjoxNjI4NTU4ODE2NTUyLCJ1c2VySWQiOiIxMTgzNjYyOTYxMzMzOTY4ODk4IiwiaWF0IjoxNjI4NDcyNDE2NTUyfQ.hOeMihQwtZRC9GbxS_ALeDth5JzaxPg2-tU7RxFRPTw'
}]

