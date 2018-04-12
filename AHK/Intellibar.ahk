#NoEnv
; #NoTrayIcon
#SingleInstance Force
#KeyHistory 0
SetBatchLines -1
ListLines, Off
SendMode Input ; Forces Send and SendRaw to use SendInput buffering for speed.
; SetTitleMatchMode, 3 ; A window's title must exactly match WinTitle to be a match.
SetWorkingDir, %A_ScriptDir%
; SplitPath, A_ScriptName, , , , MyScriptName ; store the script file name (without extension) in MyScriptName
; DetectHiddenWindows,On
; SetWinDelay, -1 ; Remove short delay done automatically after every windowing command except IfWinActive and IfWinExist
; SetKeyDelay, -1, -1 ; Remove short delay done automatically after every keystroke sent by Send or ControlSend
; SetMouseDelay,-1 ; Remove short delay done automatically after Click and MouseMove/Click/Drag
; #MaxThreadsPerHotkey,1 ; no re-entrant hotkey handling

WinActivate ahk_class Shell_TrayWnd

MsgBox, oh man

Send RButton

WinActivate, , Sublime
