AV.init({
    appId: 'ffwXCB5ppKpBXVQm4C63zVHj-gzGzoHsz',
    appKey: 'vfhTcZlnT31g8LPIsfLINTvA',
    serverURL: 'https://ffwxcb5p.lc-cn-n1-shared.com',
});

const colors = ["#c362c3", "#7070cf", "#57bdbd", "#70c370", "#c5c55e", "#c7a15b", "#b36868", "#d99edd", "#6388d3", "#468dad", "#aa6dc9", "#bb775e", "#a18299", "#07969a", "#d36a68", "#a2ad47", "#a467c9", "#c76259", "#cda562", "#8faddf"];
let currentIndex = 0;

function getRandomBackgroundColor() {
    const currentColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    return currentColor;
}

const mynameInput = document.getElementById('mynamein');
const younameInput = document.getElementById('younamein');
const zhengwenInput = document.getElementById('zhengwenin');
const tjButton = document.getElementById('tj');
const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modalText');
const closeModalButton = document.querySelector('#closeModal');

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
tjButton.addEventListener('click', () => {
    const myname = mynameInput.value;
    const youname = younameInput.value;
    const inputText = document.getElementById("zhengwenin").value;
    const convertedText = inputText.replace(/\n/g, "<br>");
    const zhengwen = convertedText;

    if (myname && youname && zhengwen) {
        const kabe = AV.Object.extend('kabe');
        const kabeRecord = new kabe();
        kabeRecord.set('from', myname);
        kabeRecord.set('to', youname);
        kabeRecord.set('data', zhengwen);
        kabeRecord.save().then(() => {
            bbknone();
            mynameInput.value = '';
            younameInput.value = '';
            zhengwenInput.value = '';
            modalText.textContent = '已发表，刷新网页查看哦(｡♥ᴗ♥｡) ';
            $("#modal").fadeIn("slow");
            return;
        }).catch(() => {
            modalText.textContent = '出错啦！请重试哦(✖人✖)';
            $("#modal").fadeIn("slow");
            return;
        });
    } else {
        modalText.textContent = '信息都填写了嘛？( • ̀ω•́ )✧';
        $("#modal").fadeIn("slow");
        return;
    }
});

const fbygBlock = document.getElementById('fbyg');
const maskbiaoBlock = document.getElementById('maskbiao');
const bbkBlock = document.getElementById('bbk');
const qxan = document.getElementById('qx');

fbygBlock.addEventListener('click', () => {
    $("#maskbiao").fadeIn("slow");
    $("#bbk").fadeIn("slow");
});

function bbknone() {
    const input1 = document.getElementById('mynamein');
    const input2 = document.getElementById('younamein');
    const input3 = document.getElementById('zhengwenin');
    input1.value = '';
    input2.value = '';
    input3.value = '';
    $("#maskbiao").fadeOut("slow");
}

qxan.addEventListener('click', () => {
    bbknone();
    modal.style.display = 'none';
});

const parentBlock = document.querySelector('.card');
const query = new AV.Query('kabe');
query.descending('createdAt');
const processLeanCloudData = new Promise((resolve, reject) => {
    query.find().then((kabeRecords) => {
        kabeRecords.forEach((record) => {
            const from = record.get('from');
            const to = record.get('to');
            const data = record.get('data');
            const createdAt = record.get('createdAt');
            const date = new Date(createdAt);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const cardBlock = document.querySelector('.card');
            const cardWidth = cardBlock.offsetWidth;
            const cardHeight = cardBlock.offsetHeight;
            const randomX = Math.floor(Math.random() * (cardWidth - 260)); 
            const randomY = Math.floor(Math.random() * (cardHeight - 300));
            const son = document.createElement('div');
            son.className = 'son';

            son.innerHTML = `
                <p id="biaoti">${from} 想对 ${to} 说:</p>
                <p id="neirong">${data}</p>
                <p id="shijian">${formattedDate}</p>
            `;

            const randomColor = getRandomBackgroundColor();
            son.style.backgroundColor = randomColor;
            son.style.left = `${randomX}px`;
            son.style.top = `${randomY}px`;
            cardBlock.appendChild(son);
        });
        resolve();
    });
});

const initializeDragFunction = new Promise((resolve, reject) => {
    processLeanCloudData.then(() => {
        dragFn('.son', '.card');
        resolve();
    });
});

Promise.all([processLeanCloudData, initializeDragFunction]).then(() => {
    console.log(`
                    _     _         _     _             
                   | |   (_)       | |   | |            
__      _____ _ __ | |__  _ _ __   | |__ | | ___   __ _ 
\\ \\ /\\ / / _ \\ '_ \\| '_ \\| | '_ \\  | '_ \\| |/ _ \\ / _\` |
 \\ V  V /  __/ | | | |_) | | | | | | |_) | | (_) | (_| |
  \\_/\\_/ \\___|_| |_|_.__/|_|_| |_| |_.__/|_|\\___/ \\__, |
                                                   __/ |
                                                  |___/
    `);
});

function dragFn(dragObj, parent) {
    $(dragObj).mousedown(function (e) {
        var _this = $(this);
        var parent_h = $(parent)[0].offsetHeight;
        var parent_w = $(parent)[0].offsetWidth;
        var drag_h = $(this)[0].offsetHeight;
        var drag_w = $(this)[0].offsetWidth;
        var dragX = e.clientX - $(this)[0].offsetLeft;
        var dragY = e.clientY - $(this)[0].offsetTop;

        $(this).css('z-index', '9').siblings().css('z-index', '1');

        $(document).mousemove(function (e) {
            var l = e.clientX - dragX;
            var t = e.clientY - dragY;
            if (l < 0) {
                l = 0;
            } else if (l > parent_w - drag_w) {
                l = parent_w - drag_w;
            }
            if (t < 0) {
                t = 0;
            } else if (t > parent_h - drag_h) {
                t = parent_h - drag_h;
            }
            _this.css({
                left: l + 'px',
                top: t + 'px',
            });
        });
    });

    // 支持手机端拖动
    $(dragObj).on('touchstart', function (e) {
        e.preventDefault(); // 阻止页面滑动
        var _this = $(this);
        var parent_h = $(parent)[0].offsetHeight;
        var parent_w = $(parent)[0].offsetWidth;
        var drag_h = $(this)[0].offsetHeight;
        var drag_w = $(this)[0].offsetWidth;
        var touch = e.originalEvent.touches[0];
        var dragX = touch.clientX - $(this)[0].offsetLeft;
        var dragY = touch.clientY - $(this)[0].offsetTop;

        $(this).css('z-index', '9').siblings().css('z-index', '1');

        $(document).on('touchmove', function (e) {
            e.preventDefault(); // 阻止页面滑动
            var touch = e.originalEvent.touches[0];
            var l = touch.clientX - dragX;
            var t = touch.clientY - dragY;
            if (l < 0) {
                l = 0;
            } else if (l > parent_w - drag_w) {
                l = parent_w - drag_w;
            }
            if (t < 0) {
                t = 0;
            } else if (t > parent_h - drag_h) {
                t = parent_h - drag_h;
            }
            _this.css({
                left: l + 'px',
                top: t + 'px',
            });
        });

        $(document).one('touchend', function () {
            $(document).off('touchmove');
        });
    });

    $(document).mouseup(function () {
        $(document).off('mousemove');
    });
}

