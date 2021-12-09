package ae.solidbase.interview.user.config;

import ae.solidbase.interview.user.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.hateoas.server.RepresentationModelProcessor;

@Configuration
public class SpringDataRestConfiguration {
    @Bean
    public RepresentationModelProcessor<EntityModel<User>> taskProcessor (EntityLinks links) {
        return new RepresentationModelProcessor<EntityModel<User>>() {
            @Override
            public EntityModel<User> process(EntityModel<User> model) {
                model.add(
                        links.linkFor(User.class)
                                .slash("userByNameAndSurname")
                                .withRel("NameAndSurname")
                );
                return model;
            }
        };
    }
}
