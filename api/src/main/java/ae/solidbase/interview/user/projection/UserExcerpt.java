package ae.solidbase.interview.user.projection;

import ae.solidbase.interview.user.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(name = "excerpt", types = {User.class})
public interface UserExcerpt {
    @Value("#{target.id}")
    Long getId();
    String getName();
    String getSurname();
    String getIdentity();

    @Value("#{target.name} #{target.surname}")
    String getFullName();
}
