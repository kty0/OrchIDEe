package fr.epita.assistants.myide.domain.service;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.entity.any.AnyAspect;
import fr.epita.assistants.myide.domain.entity.git.GitAspect;
import fr.epita.assistants.myide.domain.entity.make.MakeAspect;
import fr.epita.assistants.myide.domain.entity.maven.MavenAspect;
import fr.epita.assistants.myide.utils.Logger;
import lombok.Getter;

import java.nio.file.Path;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Getter
public class MyProjectService implements ProjectService {
    private final NodeService myNodeService = new MyNodeService();
    private final MyIde.Configuration config;

    public MyProjectService(MyIde.Configuration config) {
        this.config = config;
    }

    @Override
    public Project load(Path root) {
        if (!root.toFile().isDirectory()) {
            return null;
        }

        Node rootNode = new FolderNode(root);

        Set<Aspect> aspects = new HashSet<>();

        aspects.add(new AnyAspect());

        for (Node node : rootNode.getChildren()) {
            if (node.getPath().getFileName().toString().equals(".git")) {
                aspects.add(new GitAspect());
            }
            else if (node.getPath().getFileName().toString().equals("pom.xml")) {
                aspects.add(new MavenAspect());
            }
            else if (node.getPath().getFileName().toString().equals("Makefile")) {
                aspects.add(new MakeAspect());
            }
        }

        return new MyProject(rootNode, aspects);
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Feature.Type featureType, Object... params) {
        Optional<Feature> optFeature = project.getFeature(featureType);
        if (optFeature.isEmpty()) {
            Logger.logError("ERROR feature " + featureType.toString() + " is not in project " + project.getRootNode().getPath().getFileName().toString());
            return () -> false;
        }
        return optFeature.get().execute(project, params);
    }

    @Override
    public NodeService getNodeService() {
        return myNodeService;
    }
}
