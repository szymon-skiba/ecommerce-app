package fish.app.fishecommerce.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        private String name;
        @ManyToMany(mappedBy = "roles")
        private Collection<User> users;

        public Role(String name) {
                this.name = name;
        }

        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "roles_privileges", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id"))
        private Collection<Privilege> privileges;
}