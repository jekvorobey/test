<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Дропзоны
        </h2>

        <h3>
            Dropzone
        </h3>
        <p class="text-grey">
            nuxt-dropzone адаптер
            <a
                href="https://github.com/Etheryte/nuxt-dropzone"
                target="_blank"
                rel="noopener noreferrer"
                title="nuxt-dropzone"
            >
                https://github.com/Etheryte/nuxt-dropzone
            </a>
        </p>

        <p class="text-grey">
            dropzone.js
            <a href="https://www.dropzonejs.com/" target="_blank" rel="noopener noreferrer" title="dropzone.js">
                https://www.dropzonejs.com/
            </a>
        </p>

        <v-dropzone style="width: 400px;" id="foo" ref="el" :options="options" :destroyDropzone="true">
            Сканы паспортов
        </v-dropzone>

        <h3>
            Filepound
        </h3>
        <p class="text-grey">
            vue-filepond адаптер
            <a
                href="https://github.com/pqina/vue-filepond"
                target="_blank"
                rel="noopener noreferrer"
                title="vue-filepond"
            >
                https://github.com/pqina/vue-filepond
            </a>
        </p>

        <p class="text-grey">
            filepond.js
            <a
                href="https://pqina.nl/filepond/#profile-picture-demo"
                target="_blank"
                rel="noopener noreferrer"
                title="filepond"
            >
                https://pqina.nl/filepond/#profile-picture-demo
            </a>
        </p>

        <v-filepond
            style="width: 400px;"
            :files="myFiles"
            :allow-multiple="true"
            label-idle="<span class='filepond--label-action'>Выберите файл</span> или перетащите его сюда"
        >
            Сканы паспортов
        </v-filepond>
    </section>
</template>
<script>
import VDropzone from '../../components/controls/VDropzone/VDropzone.vue';
import VFilepond, { origin, status, fileStatus } from '../../components/controls/VFilepond/VFilepond.vue';

export default {
    name: 'ui-kit-dropzones',
    components: {
        VDropzone,
        VFilepond,
    },
    data() {
        return {
            options: {
                url: 'http://httpbin.org/anything',
                previewTemplate: this.template(),
            },
            myFiles: [
                {
                    options: {
                        type: 'input',
                        file: {
                            name: 'logo-144.png',
                            size: 3001025,
                            type: 'image/png',
                        },
                    },
                },
                {
                    options: {
                        type: 'local',
                        file: {
                            name: 'logo-34.png',
                            size: 3001025,
                            type: 'image/png',
                        },
                    },
                },
                {
                    // set type to limbo to tell FilePond this is a temp file
                    options: {
                        type: 'limbo',
                        file: {
                            name: 'logo-48.png',
                            size: 3001025,
                            type: 'image/png',
                        },
                    },
                },
            ],
        };
    },
    methods: {
        template() {
            return `<div class="dz-preview dz-file-preview">
                        <div class="dz-details">
                          <div class="dz-filename"><span data-dz-name></span></div>
                          <div class="dz-size" data-dz-size></div>
                          <div class="dz-remove" data-dz-remove></div>
                          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                        </div>
                        <div class="dz-error-message"><span data-dz-errormessage></span></div>
                    </div>`;
        },
    },
};
</script>