﻿#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
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



; Tiling script for dual monitors at 3840x1080
; Open Windows Spy (right click AHK in tray) to help if you want to adjust it
; Nearly all of it is Ctrl + Alt + Numpad number
; Make sure numlock is turned off

  
  
  ; Top Left
  
  !^NumpadHome::
            WinMove,A,,     1945, 43, 454, 274
  return    


               ; Top
  
  !^NumpadUp::
            WinMove,A,,     2422, 43, 1133, 1018
      return 

       ; Bottom

  !^NumpadDown::
            WinMove,A,,     2763, 676, 634, 383
      return


      ; Top Right
  
  !^NumpadPgUp::
            WinMove,A,,      3580, 43, 236, 446
      return     
  

  ; Bottom Left     
              
              !^NumpadEnd::
            WinMove,A,,     1945, 47, 454, 1016
  return  

              ; Bottom Right

  !^NumpadPgDn::
            WinMove,A,,      3580, 516, 236, 542
      return

              ; Left

  !^NumpadLeft::
  WinMove,A,,     36, 36, 930, 1015
      return
  

  ; Right

  !^NumpadRight::
            WinMove,A,,     996, 36, 896, 1015
  return


  ; Center (First monitor)

  !^NumpadClear::
            WinMove,A,,     36, 35, 1853, 1016
      return

  ; Nearly fullscreen

  !^F11::
            WinMove,A,,     24, 29, 1874, 1029
      return 

  ; Center (Second monitor)

  !^NumpadEnter::
            WinMove,A,,     1944, 43, 1877, 1022
      return

             ; Right (Second Monitor)
             !^NumpadAdd::
            WinMove,A,,      2386, 43, 1435, 1020
      return

         ; Middle top

         !^NumpadIns::
          WinMove,A,,     1944, 43, 1611, 1020
             return

; Center Alt (First monitor)

  !^NumpadSub::
            WinMove,A,,     201, 128, 1494, 849
      return

; Sublime + Stylish position

  !^NumpadMult::
  WinMove,A,,     1409, 36, 479, 1013
    return

; Firefox position w/ ^

  !^NumpadDiv::
WinMove,A,,     41, 36, 1344, 1013
    return

; Video Player position

  !^F7::
WinMove,A,,     2840, 113, 944, 564
    return


