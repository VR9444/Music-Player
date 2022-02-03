<?php
$log_directory = './music/';

$results_array = array();

if (is_dir($log_directory))
{
        if ($handle = opendir($log_directory))
        {
                //Notice the parentheses I added:
                while(($file = readdir($handle)) !== FALSE)
                {
                        $name = explode('.mp3',$file);
                        $results_array[] = $name[0];
                }
                closedir($handle);
        }
}

//Output findings
    echo json_encode($results_array);
