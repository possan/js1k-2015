module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
    exec: {
      shader1: {
        cmd: 'node tools/stringify.js src/vertexshader.txt build/vertexshader.js vertex_shader_code',
      },
      shader2: {
        cmd: 'node tools/stringify.js src/fragmentshader.txt build/fragmentshader.js fragment_shader_code',
      },
      crush: {
        cmd: 'node tools/jscrushish.js build/packed.js build/crushed.js'
      },
      report: {
      	cmd: 'ls -la build/*.js'
      },
      report2: {
        cmd: 'ls -la src/*txt'
      }
    },
    concat: {
      unpackedjs: {
        options: {
          separator: ''
        },
        src: [
          'templates/unpacked_top.txt',
          'build/vertexshader.js',
          'build/fragmentshader.js',
          'src/demo.js',
          'templates/unpacked_bottom.txt'
        ],
        dest: 'build/unpacked.js',
      },
      crushedshim: {
      	options: {
      		separator: ''
      	},
        src: [
          'templates/shim_top.txt',
          'build/crushed.js',
          'templates/shim_bottom.txt'
        ],
        dest: 'build/crushedshim.html',
      },
      packedshim: {
      	options: {
      		separator: ''
      	},
        src: [
          'templates/shim_top.txt',
          'build/packed.js',
          'templates/shim_bottom.txt'
        ],
        dest: 'build/packedshim.html',
      },
      unpackedshim: {
      	options: {
      		separator: ''
      	},
        src: [
          'templates/shim_top.txt',
          'build/unpacked.js',
          'templates/shim_bottom.txt'
        ],
        dest: 'build/unpackedshim.html',
      }
    },
    copy: {
      unpacked: {
        src: 'src/demo.js',
        dest: 'build/unpacked.js'
      }
    },
    uglify: {
      pack: {
        options: {
          mangle: true,
          compress: {
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            evaluate: true,
            unsafe: true
          },
          beautify: false,
          maxLineLen: 2000,
        },
        src: 'build/unpacked.js',
        dest: 'build/packed.js'
      },
      prettifypack: {
        options: {
          mangle: false,
          compress: {
          },
          beautify: true,
          maxLineLen: 100,
        },
        src: 'build/packed.js',
        dest: 'build/packed-pretty.js'
      }
    },
    watch: {
      demo: {
        files: [
          'templates/**',
          'tools/**',
          'src/**'
        ],
        tasks: [
          'wholeshebang'
        ],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.registerTask('wholeshebang', [
    'copy:unpacked',
    'exec:shader1',
    'exec:shader2',
    'concat:unpackedjs',
    'concat:unpackedshim',
    'uglify:pack',
    'uglify:prettifypack',
    'concat:packedshim',
    'exec:crush',
    'concat:crushedshim',
    'exec:report',
    'exec:report2'
  ]);

  // grunt.registerTask('watch', ['']);

}