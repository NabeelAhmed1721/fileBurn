function humanFileSize(B,i){var e=i?1e3:1024;if(Math.abs(B)<e)return B+" B";var a=i?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],t=-1;do B/=e,++t;while(Math.abs(B)>=e&&t<a.length-1);return B.toFixed(1)+" "+a[t]}