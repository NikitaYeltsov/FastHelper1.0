document.addEventListener('DOMContentLoaded', function() {
    const warningContainer = document.getElementById('warning-container');
    const toolsPage = document.getElementById('tools-page');
    const settingsButton = document.getElementById('settings-button');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsButton = document.getElementById('close-settings-button');
    const editorsLinkButton = document.getElementById('editors-link');
    const languageButton = document.getElementById('language-button');
    const languageOptions = document.getElementById('language-options');
    const languageButtons = document.querySelectorAll('#language-options button');

    let currentLanguage = localStorage.getItem('language') || 'ru'; // Язык по умолчанию
    let translations = {};


    // Функция для применения переводов
    function applyTranslations() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.dataset.lang;
            if (translations && translations[key]) {
                element.textContent = translations[key];
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = translations[key];
                }
            }
        });
        // Устанавливаем атрибут lang для элемента <html>
        document.documentElement.lang = currentLanguage;
        // Добавляем/удаляем класс rtl для поддержки арабского языка
        document.body.classList.toggle('rtl', currentLanguage === 'ar');
    }

    // Загрузка языка при инициализации
    loadTranslations(currentLanguage);

   

    toolsPage.style.display = 'block';

    if (settingsButton && settingsPanel) {
        settingsButton.addEventListener('click', function() {
            settingsPanel.classList.toggle('open');
            if (settingsPanel.classList.contains('open') && languageOptions) {
                languageOptions.classList.add('hidden');
            }
        });
    }

    if (closeSettingsButton && settingsPanel) {
        closeSettingsButton.addEventListener('click', function() {
            settingsPanel.classList.remove('open');
        });
    }

    if (editorsLinkButton) {
        editorsLinkButton.addEventListener('click', function() {
            alert(translations['editorsFunctionality'] || 'Функциональность раздела "Редакторы" будет добавлена позже.');
        });
    }

    if (languageButton && languageOptions) {
        languageButton.addEventListener('click', function(event) {
            event.stopPropagation();
            languageOptions.classList.toggle('hidden');
        });
    }

    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const langCode = this.dataset.lang;
            currentLanguage = langCode;
            localStorage.setItem('language', langCode);
            loadTranslations(langCode); // Загружаем новый язык и применяем переводы
            if (languageOptions) {
                languageOptions.classList.add('hidden');
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (languageOptions && !languageOptions.contains(event.target) && event.target !== languageButton) {
            languageOptions.classList.add('hidden');
        }
    });
});