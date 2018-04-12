#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


; Modifiers

; # = Windows Key;
; ! = Alt;        
; ^ = Control;
; + = Shift;
; & = Used to combine keys (ctrl+alt = ^&!);


  ;  Winmove, A,,    W,X,Y,Z 
  ; W = Distance from the left most side of your main monitor.
      ; X = Distance from the top of your main monitor.   
  ; Y = The total width of the window.
  ; Z = The total height of the window
  ; Remember to use Windows Spy to help!



; Tiling script for a single monitor at 1920x1080
; Open Windows Spy (right click AHK in tray) to help if you want to adjust it
; Nearly all of it is Ctrl + Alt + Numpad number
; Make sure numlock is turned off

  
  

; Left - Ctrl+Alt+Left arrow

  !^NumpadLeft::
  WinMove,A,,     36, 36, 930, 1015
      return
  


; Right - Ctrl+Alt+Right arrow

  !^NumpadRight::
            WinMove,A,,     996, 36, 896, 1015
  return



; Firefox position w/ ^ - Ctrl+Alt+7

  !^NumpadHome::
WinMove,A,,     41, 36, 1344, 1013
    return



; Top right - Ctrl+Alt+9

!^NumpadPgup::
            WinMove,A,,     1409, 36, 479, 453
  return



; Bottom right - Ctrl+Alt+3

!^NumpadPgdn::
            WinMove,A,,     1409, 522, 479, 527
  return



; Center - Ctrl+Alt+5

  !^NumpadClear::
            WinMove,A,,     36, 35, 1853, 1016
      return



; Center Alt - Ctrl+Alt+-

  !^NumpadSub::
            WinMove,A,,     201, 128, 1494, 849
      return



; Sublime + Stylish position - Ctrl+Alt+*

  !^NumpadMult::
  WinMove,A,,     1409, 36, 479, 1013
    return



; Video Player position - Ctrl+Alt+F7

  !^F7::
WinMove,A,,      310, 253, 944, 564
    return


