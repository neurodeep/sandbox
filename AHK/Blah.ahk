; xxxHide all tray icons?
; -------------------------------
; zzzOriginal: http://www.labnol.org/software/tutorials/keep-window-always-on-top/5213/
; qqqThis version uses middle mouse click on the window titlebar instead of ctrl+space

#NoEnv					; Recommended for performance and compatibility with future AutoHotkey releases.
; #NoTrayIcon 			; Do not show tray icon
#Warn					; Enable warnings to assist with detecting common errors.
#SingleInstance force	; Determines whether a script is allowed to run again when it is already running.

^e::RegExMatch(TrayIcons("flux.exe"), "(?<=idn: )\d+", idn) DeleteTrayIcon(idn)
return

TrayIcons(sExeName = "")
{
WinGet, pidTaskbar, PID, ahk_class Shell_TrayWnd
hProc:= DllCall("OpenProcess", "Uint", 0x38, "int", 0, "Uint", pidTaskbar)
pProc:= DllCall("VirtualAllocEx", "Uint", hProc, "Uint", 0, "Uint", 32, "Uint", 0x1000, "Uint", 0x4)
idxTB:= GetTrayBar()
SendMessage, 0x418, 0, 0, ToolbarWindow32%idxTB%, ahk_class Shell_TrayWnd ; TB_BUTTONCOUNT
Loop, %ErrorLevel%
{
SendMessage, 0x417, A_Index-1, pProc, ToolbarWindow32%idxTB%, ahk_class Shell_TrayWnd ; TB_GETBUTTON
VarSetCapacity(btn,32,0), VarSetCapacity(nfo,32,0)
DllCall("ReadProcessMemory", "Uint", hProc, "Uint", pProc, "Uint", &btn, "Uint", 32, "Uint", 0)
iBitmap := NumGet(btn, 0)
idn := NumGet(btn, 4)
Statyle := NumGet(btn, 8)
If dwData := NumGet(btn,12)
iString :;Get control handle of the notification area in the windows taskbar
ControlGet, handle, Hwnd,, TrayClockWClass1,,Notification Area

; right click mouse in notification area
ControlClick, ,ahk_id %handle% ,,Right 

Sleep, 100 
Send T 
Sleep, 100
Send N 
Sleep, 200
Send {TAB down}
Send <enter path to toolbar folder here>
Send {Enter}= NumGet(btn,16)
Else dwData := NumGet(btn,16,"int64"), iString:=NumGet(btn,24,"int64")
DllCall("ReadProcessMemory", "Uint", hProc, "Uint", dwData, "Uint", &nfo, "Uint", 32, "Uint", 0)
If NumGet(btn,12)
hWnd := NumGet(nfo, 0)
, uID := NumGet(nfo, 4)
, nMsg := NumGet(nfo, 8)
, hIcon := NumGet(nfo,20)
Else hWnd := NumGet(nfo, 0,"int64"), uID:=NumGet(nfo, 8), nMsg:=NumGet(nfo,12)
WinGet, pid, PID, ahk_id %hWnd%
WinGet, sProcess, ProcessName, ahk_id %hWnd%
WinGetClass, sClass, ahk_id %hWnd%
If !sExeName || (sExeName = sProcess) || (sExeName = pid)
VarSetCapacity(sTooltip,128), VarSetCapacity(wTooltip,128*2)
, DllCall("ReadProcessMemory", "Uint", hProc, "Uint", iString, "Uint", &wTooltip, "Uint", 128*2, "Uint", 0)
, DllCall("WideCharToMultiByte", "Uint", 0, "Uint", 0, "str", wTooltip, "int", -1, "str", sTooltip, "int", 128, "Uint", 0, "Uint", 0)
, sTrayIcons .= "idx: " . A_Index-1 . " | idn: " . idn . " | Pid: " . pid . " | uID: " . uID . " | MessageID: " . nMsg . " | hWnd: " . hWnd . " | Class: " . sClass . " | Process: " . sProcess . " | Tooltip: " . sTooltip . "|`n"
}
DllCall("VirtualFreeEx", "Uint", hProc, "Uint", pProc, "Uint", 0, "Uint", 0x8000)
DllCall("CloseHandle", "Uint", hProc)
Return sTrayIcons
}


HideTrayIcon(idn, bHide = True)
{
idxTB := GetTrayBar()
SendMessage, 0x404, idn, bHide, ToolbarWindow32%idxTB%, ahk_class Shell_TrayWnd ; TB_HIDEBUTTON
SendMessage, 0x1A, 0, 0, , ahk_class Shell_TrayWnd
}

DeleteTrayIcon(idx)
{
        idxTB := GetTrayBar()
        SendMessage, 0x416, idx - 1, 0, ToolbarWindow32%idxTB%, ahk_class Shell_TrayWnd   ; TB_DELETEBUTTON
        SendMessage, 0x1A, 0, 0, , ahk_class Shell_TrayWnd
}

GetTrayBar()
{
        ControlGet, hParent, hWnd,, TrayNotifyWnd1  , ahk_class Shell_TrayWnd
        ControlGet, hChild , hWnd,, ToolbarWindow321, ahk_id %hParent%
        Loop
        {
                ControlGet, hWnd, hWnd,, ToolbarWindow32%A_Index%, ahk_class Shell_TrayWnd
                If  Not hWnd
                        Break
                Else If hWnd = %hChild%
                {
                        idxTB := A_Index
                        Break
                }
        }
        Return  idxTB
}

^!#x::ExitApp, 0  		; Assign a hotkey to terminate this script.
