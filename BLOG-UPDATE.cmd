@echo off  
C:
cd C:\data\note\inote
call bin\alpha_note_blog.cmd main.DoUpdateBlog C:\data\note\inote\conf\.note.properties "-base=C:" "-dst=C:\data\blog\blog_public" "-main=C:\data\note\note_public" "-note-layout=C:\data\note\inote\conf\inote\layouts" --notOutputStatus
pause