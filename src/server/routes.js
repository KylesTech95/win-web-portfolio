
import github from "./githubapi.js"
const index = 'C:\Users\Kyles\OneDrive\Desktop\VS Code\backend\portfolio-dev\src\client\main.js'
export default function(app,pool){
  
    app.get("/hello", (req, res) => {
        res.send("Hello Vite!");
      });
      app.get("/",(req,res)=>{
        // send github data
        console.log('You are awesome')
        // res.sendFile(index)
      })
      async function githubData(){
        const git = await github()
        const git_user = git.data
        const repo_url = git_user.repos_url

        app.get('/git',(req,res)=>{
            // console.log(git_user)
              // req.query = {url:git_user.url,repos:git_user.public_repos,member_since:git_user.created_at,username:git_user.login}
            res.send(git_user)
          })

      }
      githubData()

      app.route('/notes').post(async(req,res)=>{
        // identify notes 
        const id = req.body.id
        const notes = req.body.notes;
        // insert new note into db
        try{
            if(notes){
                const insertNote = await pool.query("insert into notepad(notes) values($1)",
                [notes])
                const getID = await pool.query("select id from notepad where notes=$1",[notes])
            }
            else{
                console.log('you entered nothing')
            }
            res.redirect('/')
            
        }
        catch(err){
            console.log(err)
            res.redirect('/')
        }
        
    })

    app.get('/notes',async(req,res)=>{
        // alternate ending
        // get all fields
        const getFields = await pool.query('select * from notepad')
        const rows = getFields.rows;
        // send notes via json
        res.json(rows.map(row =>{
            return {id:row.id,notes:row.notes,timestamp:row.timestamp}
        }))
    })

    app.route('/delete').get(async(req,res)=>{
                
        try{
            await pool.query("truncate notepad;alter sequence notepad_id_seq restart with 1")
            res.redirect('/');
        }
        catch(err){
            console.log(err)
            res.redirect('/')
        }
    })
    app.get('/delete/:id',async(req,res)=>{
        const id = req.params.id;
        try{
        if(!id){
            alert('database is empty')
            red.redirect('/')
        }
        else{
        console.log(id)
        await pool.query("delete from notepad where id=$1",[id])
        console.log('you deleted an item')
        res.redirect('/')
        }
        }
        catch(err){
            console.log(err)
        }
    })
      
}
