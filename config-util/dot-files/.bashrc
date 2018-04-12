#!/bin/bash
[[ -z $PS1 ]] && return

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

# Hack for Sublime Text Terminal View
if [[ $TERM == 'linux' ]]; then
  cd
fi

# Get working dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Source global definitions
if [ -f /etc/bashrc ]; then
  . /etc/bashrc
fi

# Source custom definitions
if [[ $SSH_CONNECTION && ! $HOME == $DIR && -r $HOME/.bashrc ]]; then
  . $HOME/.bashrc
fi

# Prompt
BLINK="\[\033[05m\]"
BGREEN="\[\033[1;32m\]"
GREEN="\[\033[0;32m\]"
BRED="\[\033[1;31m\]"
RED="\[\033[0;31m\]"
BBLUE="\[\033[1;34m\]"
BLUE="\[\033[0;34m\]"
NORMAL="\[\033[00m\]"

PS1="${RED}\w ${NORMAL}\h ${RED}\$ ${NORMAL}"

# Custom shell options
for opt in checkwinsize autocd cdspell checkjobs dirspell mailwarn; do
  shopt -s $opt
done

export HISTSIZE="5000"
export HISTFILESIZE="10000"
export HISTCONTROL="ignoredups"
export EDITOR="vim"
export COLORFGBG="default;default"

# Custom binaries
if [[ $PATH != *$PREFIX/bin* && -d "$PREFIX/bin" ]]; then
  export PATH="$PREFIX/bin:$PATH"
fi

# Force keyring
if [[ -z $SSH_CONNECTION ]] && type gnome-keyring-daemon >/dev/null 2>&1; then
  eval $(gnome-keyring-daemon --start)
fi

# Input
if [[ -r $DIR/.inputrc ]]; then
  export INPUTRC=$DIR/.inputrc
fi

# Color highlight
if [[ -r $DIR/.dircolors ]]; then
  eval $(dircolors -b $DIR/.dircolors)
fi

# Aliases
if [[ -r $DIR/.bash_alias ]]; then
  . $DIR/.bash_alias
fi

# Functions
if [[ -r $DIR/.bash_function ]]; then
  . $DIR/.bash_function
fi

# Bash completion
if [[ -r $DIR/.bash_completion ]]; then
  . $DIR/.bash_completion
elif [[ -r /etc/bash_completion ]]; then
  . /etc/bash_completion
fi
