---
layout: post
title: manually migrate from cvs to git
subtitle: The process was painless, but involved dealing with long forgotten CVS commands. So here’s how I did it using just the command line.
poster: stay-under-the-light.jpeg
poster_subtitle: Stay under the light
---
Hey. Recently at work we had to work with a project still hanging around on the company’s CVS. The team quickly figured “what the hell, let’s move that to Git”. The process was painless, but involved dealing with long forgotten CVS commands. So here’s how I did it using just the command line.

First I had to setup CVSROOT environment and create the cvspass used to login on CVS:

```sh
export CVSROOT=:pserver:username@cvs.company.com:2401/opt/cvs/data
touch ~/.cvspass
cvs login
```

There were actually three modules to that project. I checked out all three, but I’ll show only one here:

```sh
cd my-dev-projects
cvs checkout ThatOldProjectModule
cd ThatOldProjectModule
```

Now the magic. Git comes with a CVS import utility — make sure it’s installed and cvsps binary is in your path. All I had to do was call it from the CVS working copy and point a destination folder where the new Git repository would sit:

```sh
git cvsimport -C ../that-old-project-module .
cd ../that-old-project-module
git log
```

Yes. Everything was there. The repository was local, so I created the project on the company’s Git server and pushed:

```sh
git remote add origin git@ngit.company.com:that-old-project/that-old-project-module.git
git push origin master 
```

After checking that everything was fine on Git the CVS repository can be deleted. As I didn’t have permissions to do so on our server I just cleaned up everything and left a note.

```sh
cd ../ThatOldProjectModule
cvs remove -f -R *
echo "This project was migrated to Git" > find-me-on-git.txt
cvs add find-me-on-git.txt
cvs commit -m "Moved project to Git - you can find me on http://ngit.company.com/that-old-project"
```

One last thing, I noticed at this point that folders weren’t removed. I really didn’t care, but a quick search showed that folders can’t be removed from CVS — I never knew it. But empty folders can be pruned out on update or checkout:

```sh
cvs update -p
```

Not that it really mattered: everything was ready for some heavy coding on Git.
