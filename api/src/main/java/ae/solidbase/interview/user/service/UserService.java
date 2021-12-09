package ae.solidbase.interview.user.service;

import ae.solidbase.interview.user.exception.UserNotFoundException;
import ae.solidbase.interview.user.model.User;
import ae.solidbase.interview.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {

    private  final UserRepository userRepository;

    /**
     * Get users by name and surname from DB
     */
    public User getUserByNameAndSurname(String name, String surname) throws UserNotFoundException {
        return userRepository.getWhereNameAndSurnameIsEqual(name, surname)
                .orElseThrow(() -> new UserNotFoundException("User with name " + name + " surname " +
                        surname + " not found"));

    }


}
