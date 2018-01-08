module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            minify: {
                expand: true,
                cwd: 'dev/css/',
                src: ['*.css'],
                dest: 'release/css/'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/',
                    src: ['*.js'],
                    dest: 'build/babel/'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,
                cwd: 'build/babel/',
                src: ['*.js'],
                dest: 'release/js/'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev/',
                        src: [
                            'index.html',
                            'img/',
                            'html/'
                        ],
                        dest: 'release/'
                    }
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');

    // Default task(s).
    grunt.registerTask('default', ['cssmin','jshint','babel','uglify','copy']);

};