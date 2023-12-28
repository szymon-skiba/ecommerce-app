package fish.app.fishecommerce.exception;

public class FishNotFoundException extends RuntimeException{
    public FishNotFoundException(Long id){
        super(String.format("Fish with id=%d not found", id));
    }

    public static FishNotFoundException of(Long id){
        return new FishNotFoundException(id);
    }


}
