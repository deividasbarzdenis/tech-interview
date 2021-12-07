package ae.solidbase.interview.user.repository;

import ae.solidbase.interview.user.model.User;
import ae.solidbase.interview.user.projection.UserExcerpt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = UserExcerpt.class)
public interface UserRepository extends JpaRepository<User, Long> {
}
