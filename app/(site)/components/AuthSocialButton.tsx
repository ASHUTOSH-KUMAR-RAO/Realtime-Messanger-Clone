import {IconType} from 'react-icons'

export interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  loading?: boolean;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon:Icon,
    onClick
}) => {
    return ( 
        <button
        type='button'
        onClick={onClick}
        className='
        inline-flex
        items-center
        justify-center
        w-full
        px-4
        py-2.5
        text-sm
        font-medium
        text-gray-800
        bg-white
        rounded-xl
        shadow-md
        ring-1
        ring-gray-300
        hover:bg-gray-50
        hover:ring-gray-400
        active:bg-gray-100
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition-all
        duration-200
        ease-in-out
        cursor-pointer
        '
        >
            <Icon/>
        </button>
     );
}
 
export default AuthSocialButton;