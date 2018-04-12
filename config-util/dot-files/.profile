# Set TZ
# export TZ="UTC"

# HG Symlinks
for i in 45 50; do
  rm $HOME/hg/$i
  if [[ -d /var/tmp/nikolaym/hg ]]; then
    ln -s /var/tmp/nikolaym/hg/$i $HOME/hg/$i
  else
    ln -s /tmp/nikolaym/kiev6/var/tmp/nikolaym/hg/$i $HOME/hg/$i
  fi
done

# Custom prefix for builds
export PREFIX="$HOME/.local"

# Custom binaries
if [[ $PATH != *$PREFIX/bin* && -d "$PREFIX/bin" ]]; then
  export PATH="$PREFIX/bin:$PATH"
fi

# @see $PREFIX/share/config.site
if [[ -d $PREFIX/lib ]]; then
  export LD_LIBRARY_PATH="$PREFIX/lib:$PREFIX/lib/x86_64-linux-gnu"
fi
if [[ -d $PREFIX/lib/pkgconfig ]]; then
  export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig:$PREFIX/lib/x86_64-linux-gnu/pkgconfig"
fi
if [[ -d $PREFIX/include ]]; then
  export CPPFLAGS="-I$PREFIX/include"
  # for i in $( find $PREFIX/lib -type d -name include ); do export CPPFLAGS="$CPPFLAGS -I$i"; done
  # for i in $( ls $PREFIX/include ); do export CPPFLAGS="$CPPFLAGS -I$PREFIX/include/$i"; done
fi

# CPAN vars
export PATH="$PATH:$HOME/.perl5/bin"
export PERL5LIB="$PERL5LIB:$HOME/.perl5/lib/perl5"
export PERL_LOCAL_LIB_ROOT="$HOME/.perl5"
export PERL_MB_OPT='--install_base "$HOME/.perl5"'
export PERL_MM_OPT='INSTALL_BASE="$HOME/.perl5"'

# # Auto mount servers
# for i in psg psm apps; do
#   MOUNT="/tmp/$USER/$i"
#   LOG="/tmp/$USER/sshfs.log"
#   mount | grep $MOUNT >/dev/null
#   date >> $LOG
#   [ $? == 1 ] && sshfs $i:/ $MOUNT >> $LOG || echo "$i already mounted" >> $LOG
# done
