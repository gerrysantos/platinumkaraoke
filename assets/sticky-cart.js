(function(){
    var config = {"background": "#0084ff", "automatic": true, "advanced": false, "foreground": "#ffffff", "custom_html": "", "custom_selector": "", "size": "24", "padding": "10"};
    var original_button = null;
    var sticky_button = null;

    function scroll(e){
        var original_rect = original_button.getBoundingClientRect();
        var sticky_rect = sticky_button.getBoundingClientRect();
        var bottom = -10 * sticky_rect.height;

        if(original_rect.top < 0){
            bottom =  (-1 * sticky_rect.height) - original_rect.top;
            if(bottom > 0){
                bottom = 0;
            }
        }

        sticky_button.style.bottom = bottom + 'px';
    }

    function initialize(){
        var selectors = [
            'form[action="/cart/add"] [type="submit"]',
            '.addtocart-js'
        ];

        if(config.advanced && config.custom_selector != ''){
            selectors = [config.custom_selector];
        }

        for(var i = 0; i < selectors.length; i++){
            original_button = document.querySelector(selectors[i]);
            if(original_button){
                break;
            }
        }

        if(!original_button){
            return;
        }

        var style = getComputedStyle(original_button);

        sticky_button = document.createElement('button');

        sticky_button.style.font = style.font;
        sticky_button.innerText = original_button.innerText;
        sticky_button.classList.add('sticky-cart-button');

        if(original_button.tagName === 'INPUT'){
            sticky_button.innerText = original_button.value;
        }

        if(config.advanced && config.custom_html != ''){
            sticky_button.innerHTML = config.custom_html;

        }

        if(config.automatic){
            sticky_button.style.background = style.background;
            sticky_button.style.color = style.color;
            sticky_button.style.padding = style.padding;
            sticky_button.style.border = style.border;
            sticky_button.style.borderRadius = style.borderRadius;
        }else {
            sticky_button.style.border = 'initial';
            sticky_button.style.borderRadius = 'initial';
            sticky_button.style.background = config.background;
            sticky_button.style.color = config.foreground;
            sticky_button.style.fontSize = config.size + 'px';
            sticky_button.style.padding = config.padding + 'px';
        }

        sticky_button.style.position = 'fixed';
        sticky_button.style.bottom = -100000000;
        sticky_button.style.zIndex = 999;
        sticky_button.style.left = 0;
        sticky_button.style.right = 0;
        sticky_button.style.textAlign = 'center';
        sticky_button.style.display = 'block';
        sticky_button.style.width = '100%';

        sticky_button.addEventListener('click', function(){original_button.click();});

        document.body.appendChild(sticky_button);

        document.addEventListener('scroll', scroll);
        scroll();
    }

    initialize();
})();