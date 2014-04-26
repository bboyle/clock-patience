'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


		// Task configuration.
		clean: {
			build: [ 'build' ]
		},


		// production pipeline tasks
		copy: {
			html: {
				src: 'src/index.html',
				dest: 'app/index.html'
			}
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'app/js/<%= pkg.name %>.js'
			},
			css: {
				src: 'build/css/<%= pkg.name %>.css',
				dest: 'app/css/<%= pkg.name %>.css'
			},
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'app/js/<%= pkg.name %>.js'
			},
		},
		compass: {
			src: {
				options: {
					sassDir: 'src/sass',
					imagesDir: 'src/sass',
					cssDir: 'build/css',
					environment: 'development'
				}
			},
			app: {
				options: {
					sassDir: 'src/sass',
					imagesDir: 'src/sass',
					cssDir: 'app/css',
					environment: 'development'
				}
			}
		},


		// code quality tasks
		csslint: {
			src: {
				options: {
					csslintrc: 'src/.csslintrc'
				},
				src: [ 'build/**/*.css' ]
			},
			app: {
				options: {
					csslintrc: 'src/.csslintrc'
				},
				src: [ 'app/**/*.css' ]
			},
		},
		jshint: {
			gruntfile: {
				options: { jshintrc: '.jshintrc' },
				src: [
					'Gruntfile.js',
					'package.json',
					'src/.jshintrc',
					'.jshintrc',
					'.jsbeautifyrc'
				]
			},
			src: {
				options: { jshintrc: 'src/.jshintrc' },
				src: [ 'src/**/*.js' ]
			},
			app: {
				options: { jshintrc: 'src/.jshintrc' },
				src: [ 'app/**/*.js' ]
			},
		},
		jsbeautifier: {
			js: {
				options: {
					config: '.jsbeautifyrc',
				},
				src: [ 'src/**/*.js' ]
			}
		},


		// automation
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: [ 'jshint:gruntfile' ]
			},
			srcHtml: {
				files: 'src/index.html',
				tasks: [ 'copy:html' ]
			},
			srcJs: {
				files: '<%= jshint.src.src %>',
				tasks: [ 'compile-js' ]
			},
			srcCss: {
				files: 'src/sass/*.scss',
				tasks: [ 'compile-css' ]
			},
			appJs: {
				files: '<%= jshint.app.src %>',
				tasks: [ 'jshint:app' ]
			},
			appCss: {
				files: '<%= csslint.app.src %>',
				tasks: [ 'csslint:app' ]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-compass' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-jsbeautifier' );

	// Default task.
	grunt.registerTask( 'compile', [ 'compile-css', 'compile-js' ]);
	grunt.registerTask( 'compile-css', [ 'compass:src', 'csslint:src', 'concat:css' ]);
	grunt.registerTask( 'compile-js', [ 'jsbeautifier:js', 'jshint:src', 'uglify' ]);
	grunt.registerTask( 'produce', [ 'clean', 'compile', 'copy:html' ]);

	grunt.registerTask( 'test', [ 'csslint', 'jshint' ]);
	grunt.registerTask( 'quality-control', [ 'csslint:app', 'jshint:app' ]);
	grunt.registerTask( 'default', [ 'compile', 'test', 'produce', 'quality-control' ]);

};
