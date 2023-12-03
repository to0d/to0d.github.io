@echo off  
C:
cd C:\data\note\inote
call bin\alpha_note_blog.cmd main.DoUpdateBlog C:\data\note\inote\conf\.note.properties "-base=C:" "-dst=C:\data\public\to0d.github.io" "-main=C:\data\note\note_public" "-note-layout=C:\data\note\inote\conf\inote\layouts" "-lt=C:\data\public\leetcode" --notOutputStatus
pause