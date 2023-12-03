@echo off  
C:
cd C:\data\note\inote
call bin\alpha_note_blog.cmd main.DoListUnrefNodes C:\data\note\inote\conf\.note.properties "-base=C:" "-dst=C:\data\public\to0d.github.io" "-main=C:\data\note\note_public" --notOutputStatus
pause