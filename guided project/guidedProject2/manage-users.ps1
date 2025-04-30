# Reads the user.csv file
$users=Import-Csv -Path "D:\DevOps_practise\guided project\guidedProject2\users.csv"

$logFile= "D:\DevOps_practise\guided project\guidedProject2\user_management_logs.txt"

# fuction to log actions
function Log-Actions {
    param (
        [string]$message
    )
    $timestamp = (Get-Date).ToString("yyyy:MM:dd HH:mm:ss")
    $logMessage = "$timestamp - $message"
    Add-Content -Path $logFile - $logMessage
    
}

# reiterate through each user present in the file
foreach ($user in $user){
    $username = $user.Username
    $password = $user.Password
    $role = $user.Role

    $existingUser = Get-LocalUser -Name $username -ErrorAction SilentlyContinue

    if( $existingUser){

    }
}
4011 3825 0018 2523
07/28 025