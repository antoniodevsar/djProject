#!/bin/bash

#coverage==3.5
#nose==1.1.2
#pylint==0.24
#pep8==0.6.1
#pyflakes==0.5
#(fork) django-coverage ---> pip install hg+https://fsilvera@bitbucket.org/fsilvera/django-coverage

#configure settings.py 
#   in apps: add 'django_coverage'
#   COVERAGE_REPORT_HTML_OUTPUT_DIR='/tmp/coverage/'
#   TEST_RUNNER = 'django_coverage.coverage_runner.CoverageRunner'

#configurations

APPS="project sprint"
FILE_TMP="/tmp/output_precommit.text"
COVERAGE_OK=10
DIR_APPS="/home/antonio/proyectos/djproject/djProject/djProject/apps/"
DIR_PROJECT="/home/antonio/proyectos/djproject/djProject/djProject/"

print_message(){
    tput setaf $2
    echo "$1"
    tput sgr0
}

clean_pyc(){
    print_message "<-- Clean *.pyc files -->" 2;
    for i in $(find . -name '$DIR_PROJECT*.pyc'); do rm -f $i; done
    print_message "ok!" 3;
    echo
}

run_pylint(){
    print_message "<-- Pylint -->" 2;
    PWD=$pwd    
    cd $DIR_APPS
    pylint * | grep rated
    cd $PWD
    print_message "pylint app to see details" 3;
    echo
}

run_pep8(){
    print_message "<-- PEP8 -->" 2;
    pep8 $DIR_APPS --ignore=E501,E221,E202,E251,W391,W291,E701,W293,W292 > $FILE_TMP
    PEP=$(cat $FILE_TMP | wc -l)
    if [ $PEP -gt 0 ];
    then
	    print_message "PEP8 :(" 1;
        cat $FILE_TMP
        exit 1
    else
        print_message "PEP8 :)" 3;
    fi
    echo
    echo
}

run_pyflakes(){
    print_message "<-- Pyflakes -->" 2;
    pyflakes $DIR_APPS > $FILE_TMP
    cat $FILE_TMP | grep -v 'tests/__init__.py' > $FILE_TMP
    PYFLAKES=$(cat $FILE_TMP | wc -l)
    if [ $PYFLAKES -gt 0 ];
    then
        print_message "PYFLAKES :(" 1;
        cat $FILE_TMP
        exit 1
    else
        print_message "PYFLAKES :)" 3;
    fi
    echo
    echo
}

run_test(){
    print_message "<-- Test -->" 2;
    PWD=$pwd    
    cd $DIR_PROJECT
    if python manage.py test $APPS > $FILE_TMP;
    then
    	echo
    	print_message "TESTS :)" 3;
    	echo
    else
    	echo
    	print_message "TESTS :(" 1;
	    cd $PWD
    	exit 1
    fi
    cat $FILE_TMP
    cd $PWD

    RESULT_COVERAGE=$(cat $FILE_TMP | grep 'TOTAL' | tr -s ' ' | cut -d ' ' -f4 | tr -d '%')
    if [ $RESULT_COVERAGE -gt $COVERAGE_OK ];
    then
        print_message "file:///tmp/coverage/index.html" 2;
        print_message "COVERAGE :)" 3;
    else
        print_message "COVERAGE :(  -  $RESULT_COVERAGE% < $COVERAGE_OK%" 1;
        exit 1
    fi
}




if [ "$1" ];
then
	case $1 in
 	clean_pyc )
  		clean_pyc;
		;;
 	pylint )
  		run_pylint;
  		;;
 	pep8 )
  		run_pep8;
		;;
 	pyflakes )
  		run_pyflakes;
		;;
 	test )
  		run_test;
		;;
 	help )
  		echo "options: clean_pyc, pylint, pyflakes, test"
		;;
 	esac	
else
 
	clean_pyc;
	run_pylint;
	run_pep8;
	run_pyflakes;
	run_test;
	
	echo
	print_message "ALL OK!!" 2;
	echo
	
fi
