package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.IOException;

public class GitStatus implements Feature{
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        System.out.println("hello im gonna git status");
        try {
            // The repository exists because if it did not, it would not have a Git Aspect
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);
            Status status = git.status().call();
            // TODO: return or write the Set<String> for git status somewhere

            System.out.println("Untracked files : " + status.getUntracked());
            System.out.println("Added files : " + status.getAdded());
            System.out.println("Changed files : " + status.getChanged());
            System.out.println("Uncommited changes: " + status.getUncommittedChanges());
        }
        catch (IOException e) {
            Logger.log("IOException in GitStatus : " + e.getMessage());
        } catch (GitAPIException e) {
            Logger.log("GitAPIException in GitStatus : " + e.getMessage());
        }
        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.STATUS;
    }
}
